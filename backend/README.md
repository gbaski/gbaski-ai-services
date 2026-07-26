# Gbaski Voice AI Backend (GoFiber)

GoFiber backend for Voice AI business actions and realtime bridge.

## Run

```bash
go run ./cmd/voice-api
```

Default port: `8080` (override with `VOICE_API_PORT`).

## Endpoints

- `POST /api/leads/capture`
- `GET /api/leads/:id`
- `POST /api/ai/event-log`
- `POST /api/tools/capture_lead`
- `GET /api/voice/events`
- `GET /api/ws` (WebSocket)

## Frontend integration

Angular dev server proxies `/api` to `http://localhost:8080` via `proxy.conf.json`.

Run in separate terminals:

```bash
npm run api:go
npm run start
```
