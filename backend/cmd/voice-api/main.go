package main

import (
	"log"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

const maxBridgeEvents = 500

type leadRecord struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Phone     string `json:"phone,omitempty"`
	Company   string `json:"company,omitempty"`
	Need      string `json:"need,omitempty"`
	Source    string `json:"source"`
	CreatedAt string `json:"createdAt"`
}

type captureLeadRequest struct {
	Name       string `json:"name"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	Company    string `json:"company"`
	Need       string `json:"need"`
	Source     string `json:"source"`
	ReferredBy string `json:"referredBy"`
}

type bridgeEvent struct {
	Type      string      `json:"type"`
	Payload   interface{} `json:"payload,omitempty"`
	CreatedAt string      `json:"createdAt"`
}

var (
	leads   = map[string]leadRecord{}
	leadsMu sync.RWMutex

	events   = make([]bridgeEvent, 0, maxBridgeEvents)
	eventsMu sync.RWMutex

	clients   = map[*websocket.Conn]struct{}{}
	clientsMu sync.RWMutex

	writeMu sync.Mutex
)

func main() {
	app := fiber.New(fiber.Config{
		AppName: "Gbaski Voice AI Backend",
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "ok",
		})
	})

	app.Post("/api/leads/capture", func(c *fiber.Ctx) error {
		return captureLead(c, "voice_ai")
	})

	app.Get("/api/leads/:id", getLeadByID)

	app.Post("/api/ai/event-log", func(c *fiber.Ctx) error {
		var payload map[string]interface{}
		if err := c.BodyParser(&payload); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "error",
				"error":  "invalid event payload",
			})
		}

		payload["loggedAt"] = time.Now().UTC().Format(time.RFC3339)
		broadcast("ai_event_logged", payload)

		return c.JSON(fiber.Map{
			"status": "logged",
		})
	})

	app.Post("/api/tools/capture_lead", func(c *fiber.Ctx) error {
		return captureLead(c, "voice_ai_tool")
	})

	app.Get("/api/voice/events", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"success": true,
			"events":  recentEvents(50),
		})
	})

	app.Use("/api/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	app.Get("/api/ws", websocket.New(handleWebsocket))

	port := os.Getenv("VOICE_API_PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("GoFiber Voice API listening on http://localhost:%s", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatal(err)
	}
}

func captureLead(c *fiber.Ctx, defaultSource string) error {
	var payload captureLeadRequest
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "invalid lead payload",
		})
	}

	payload.Name = strings.TrimSpace(payload.Name)
	payload.Email = strings.TrimSpace(payload.Email)
	if payload.Name == "" || payload.Email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "name and email are required",
		})
	}

	source := strings.TrimSpace(payload.Source)
	if source == "" {
		source = defaultSource
	}

	lead := leadRecord{
		ID:        buildLeadID(),
		Name:      payload.Name,
		Email:     payload.Email,
		Phone:     strings.TrimSpace(payload.Phone),
		Company:   strings.TrimSpace(payload.Company),
		Need:      strings.TrimSpace(payload.Need),
		Source:    source,
		CreatedAt: time.Now().UTC().Format(time.RFC3339),
	}

	leadsMu.Lock()
	leads[lead.ID] = lead
	leadsMu.Unlock()

	broadcast("lead_captured", lead)
	if source == "voice_ai_tool" {
		broadcast("tool_invoked", fiber.Map{
			"tool":   "capture_lead",
			"leadId": lead.ID,
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"lead":    lead,
	})
}

func getLeadByID(c *fiber.Ctx) error {
	id := c.Params("id")
	leadsMu.RLock()
	lead, ok := leads[id]
	leadsMu.RUnlock()
	if !ok {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"error":   "Lead not found",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"lead":    lead,
	})
}

func handleWebsocket(conn *websocket.Conn) {
	clientsMu.Lock()
	clients[conn] = struct{}{}
	clientsMu.Unlock()

	defer func() {
		clientsMu.Lock()
		delete(clients, conn)
		clientsMu.Unlock()
		_ = conn.Close()
	}()

	_ = safeWriteJSON(conn, bridgeEvent{
		Type:      "connected",
		Payload:   fiber.Map{"status": "ok"},
		CreatedAt: nowISO(),
	})
	_ = safeWriteJSON(conn, bridgeEvent{
		Type:      "event_history",
		Payload:   recentEvents(20),
		CreatedAt: nowISO(),
	})

	for {
		messageType, data, err := conn.ReadMessage()
		if err != nil {
			return
		}
		if messageType != websocket.TextMessage {
			continue
		}

		if strings.TrimSpace(string(data)) == "ping" {
			_ = safeWriteJSON(conn, bridgeEvent{
				Type:      "pong",
				CreatedAt: nowISO(),
			})
		}
	}
}

func broadcast(eventType string, payload interface{}) {
	event := bridgeEvent{
		Type:      eventType,
		Payload:   payload,
		CreatedAt: nowISO(),
	}

	eventsMu.Lock()
	events = append(events, event)
	if len(events) > maxBridgeEvents {
		events = events[len(events)-maxBridgeEvents:]
	}
	eventsMu.Unlock()

	clientsMu.RLock()
	stale := make([]*websocket.Conn, 0)
	for client := range clients {
		if err := safeWriteJSON(client, event); err != nil {
			stale = append(stale, client)
		}
	}
	clientsMu.RUnlock()

	if len(stale) > 0 {
		clientsMu.Lock()
		for _, conn := range stale {
			delete(clients, conn)
			_ = conn.Close()
		}
		clientsMu.Unlock()
	}
}

func recentEvents(limit int) []bridgeEvent {
	eventsMu.RLock()
	defer eventsMu.RUnlock()

	if len(events) <= limit {
		cp := make([]bridgeEvent, len(events))
		copy(cp, events)
		return cp
	}

	start := len(events) - limit
	cp := make([]bridgeEvent, limit)
	copy(cp, events[start:])
	return cp
}

func safeWriteJSON(conn *websocket.Conn, payload interface{}) error {
	writeMu.Lock()
	defer writeMu.Unlock()
	return conn.WriteJSON(payload)
}

func buildLeadID() string {
	return "lead_" + time.Now().UTC().Format("20060102150405.000000000")
}

func nowISO() string {
	return time.Now().UTC().Format(time.RFC3339)
}
