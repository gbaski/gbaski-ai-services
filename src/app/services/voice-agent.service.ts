import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CONVAI_AGENT_ID } from '../config/elevenlabs.config';
import { ORGANIZATION } from '../seo/site-seo.config';

export type VoiceUiState =
  | 'idle'
  | 'listening'
  | 'speaking'
  | 'thinking'
  | 'lead_form'
  | 'recommendation'
  | 'confirmation'
  | 'success';

type TimelineRole = 'user' | 'assistant' | 'system' | 'tool';

export interface TimelineEntry {
  id: string;
  role: TimelineRole;
  text: string;
  timestamp: string;
}

export interface VoiceRecommendation {
  title: string;
  value: string;
  ctaLabel?: string;
}

export interface LeadPayload {
  name: string;
  brief: string;
}

type LeadFormToolParams = Partial<LeadPayload> & {
  need?: string;
  description?: string;
};

export interface ConfirmedLead extends LeadPayload {
  confirmedAt: string;
}

interface ConversationSession {
  endSession: () => Promise<void> | void;
  sendUserMessage: (text: string) => void;
}

type ClientToolResult = string;

type ClientToolMap = {
  setUIState: (params: { state: VoiceUiState }) => Promise<ClientToolResult>;
  showLeadForm: (params?: LeadFormToolParams) => Promise<ClientToolResult>;
  showRecommendation: (params: { items?: VoiceRecommendation[]; summary?: string }) => Promise<ClientToolResult>;
};

@Injectable({ providedIn: 'root' })
export class VoiceAgentService {
  readonly uiState = signal<VoiceUiState>('idle');
  readonly sessionActive = signal(false);
  readonly sessionStarting = signal(false);
  readonly sessionEnding = signal(false);
  readonly timeline = signal<TimelineEntry[]>([]);
  readonly recommendations = signal<VoiceRecommendation[]>([]);
  readonly confirmation = signal<string>('');
  readonly leadDraft = signal<Partial<LeadPayload>>({});
  readonly confirmedLead = signal<ConfirmedLead | null>(null);
  readonly redirectNotice = signal<string | null>(null);
  readonly handoffPending = signal(false);
  readonly error = signal<string | null>(null);
  readonly conversationId = signal<string | null>(null);

  private conversation?: ConversationSession;
  private ws?: WebSocket;
  private leadFormPending = false;
  private handoffTimer?: ReturnType<typeof setTimeout>;
  private handoffFallbackTimer?: ReturnType<typeof setTimeout>;
  private whatsappHandoffDone = false;

  constructor(private readonly http: HttpClient) {}

  async startSession(agentId: string = CONVAI_AGENT_ID): Promise<void> {
    if (!this.isBrowser()) {
      return;
    }

    if (this.sessionActive() || this.sessionStarting()) {
      return;
    }

    this.sessionStarting.set(true);
    this.error.set(null);
    this.recommendations.set([]);
    this.confirmation.set('');
    this.confirmedLead.set(null);
    this.redirectNotice.set(null);
    this.handoffPending.set(false);
    this.leadFormPending = false;
    this.whatsappHandoffDone = false;
    this.clearHandoffTimers();
    this.addTimeline('system', 'Initializing voice consultant session');
    this.connectRealtimeBridge();

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      this.setUiState('listening');

      const sdk = (await import('@elevenlabs/client')) as {
        Conversation: {
          startSession: (config: {
            agentId: string;
            clientTools: ClientToolMap;
            onConnect?: (payload: { conversationId: string }) => void;
            onDisconnect?: () => void;
            onError?: (error: unknown) => void;
            onMessage?: (message: unknown) => void;
          }) => Promise<ConversationSession>;
        };
      };

      this.conversation = await sdk.Conversation.startSession({
        agentId,
        clientTools: this.buildClientTools(),
        onConnect: ({ conversationId }) => {
          this.sessionActive.set(true);
          this.conversationId.set(conversationId);
          this.setUiState('listening');
          this.addTimeline('system', `Voice session connected (${conversationId})`);
        },
        onDisconnect: () => {
          this.sessionActive.set(false);
          this.conversationId.set(null);
          this.setUiState('idle');
          this.addTimeline('system', 'Voice session ended');
        },
        onError: (err) => {
          this.error.set('Voice session error. Please retry.');
          this.setUiState('idle');
          this.addTimeline('system', this.stringifyError(err));
        },
        onMessage: (message) => {
          this.handleTranscriptEvent(message);
        },
      }) as ConversationSession;
    } catch (err) {
      this.error.set('Could not start voice session. Microphone access may be blocked.');
      this.setUiState('idle');
      this.addTimeline('system', this.stringifyError(err));
      await this.logEvent('voice_start_failed', { error: this.stringifyError(err) });
    } finally {
      this.sessionStarting.set(false);
    }
  }

  async endSession(): Promise<void> {
    if (this.sessionEnding()) {
      return;
    }

    if (!this.conversation && !this.sessionActive()) {
      return;
    }

    this.sessionEnding.set(true);
    try {
      await this.conversation?.endSession();
    } finally {
      this.conversation = undefined;
      this.sessionActive.set(false);
      this.conversationId.set(null);
      this.leadFormPending = false;
      this.handoffPending.set(false);
      this.clearHandoffTimers();
      this.setUiState('idle');
      this.disconnectRealtimeBridge();
      this.sessionEnding.set(false);
    }
  }

  async confirmLead(payload: LeadPayload): Promise<void> {
    if (!this.isBrowser()) {
      return;
    }

    const confirmed: ConfirmedLead = {
      ...payload,
      confirmedAt: new Date().toISOString(),
    };

    this.leadDraft.set(payload);
    this.confirmedLead.set(confirmed);
    this.confirmation.set(`Thank you, ${payload.name.trim()}. Your details are confirmed.`);
    this.redirectNotice.set('You will be redirected to WhatsApp shortly.');
    this.leadFormPending = false;
    this.handoffPending.set(true);
    this.setUiState('confirmation');
    this.addTimeline('tool', 'Lead details confirmed on screen');
    await this.logEvent('lead_confirmed_on_screen', payload);

    this.conversation?.sendUserMessage('I have confirmed my details on the screen.');
    this.scheduleHandoffFallback();
  }

  private async completeHandoff(): Promise<void> {
    const lead = this.confirmedLead();
    if (!lead || !this.handoffPending() || this.whatsappHandoffDone) {
      return;
    }

    this.whatsappHandoffDone = true;
    this.clearHandoffTimers();
    this.addTimeline('tool', 'Opening WhatsApp');

    const message = this.buildWhatsAppMessage(lead);
    const whatsappUrl = `${ORGANIZATION.contactUrl}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    this.handoffPending.set(false);
    this.setUiState('success');
    this.addTimeline('system', `Lead sent to WhatsApp for ${lead.name}`);
    await this.logEvent('lead_whatsapp_redirect', lead);
    await this.endSession();
  }

  async setState(state: VoiceUiState): Promise<void> {
    this.setUiState(state);
    await this.logEvent('ui_state_changed', { state });
  }

  clearError(): void {
    this.error.set(null);
  }

  private buildClientTools(): ClientToolMap {
    return {
      setUIState: async (params) => {
        this.setUiState(params.state);
        await this.logEvent('client_tool:set_ui_state', params);
        return 'UI state updated';
      },
      showLeadForm: async (params) => {
        const normalized = this.normalizeLeadFormParams(params);
        this.leadDraft.set({ ...this.leadDraft(), ...normalized });
        this.leadFormPending = true;
        this.setUiState('lead_form');
        this.addTimeline('tool', 'Lead form opened');
        await this.logEvent('client_tool:show_lead_form', { raw: params ?? {}, normalized });
        return 'Lead form opened';
      },
      showRecommendation: async (params) => {
        const fallback: VoiceRecommendation[] = [
          {
            title: 'AI Automation',
            value: 'Automate repetitive operations and reduce manual follow-ups.',
            ctaLabel: 'Explore automation',
          },
          {
            title: 'Chatbot Integration',
            value: 'Deploy support and sales chatbots across web and WhatsApp.',
            ctaLabel: 'View chatbot flow',
          },
          {
            title: 'Voice Assistant',
            value: 'Launch voice-first support that qualifies leads in real time.',
            ctaLabel: 'Plan voice assistant',
          },
        ];

        this.recommendations.set(params.items?.length ? params.items : fallback);
        if (params.summary) {
          this.addTimeline('assistant', params.summary);
        }
        this.setUiState('recommendation');
        await this.logEvent('client_tool:show_recommendation', params);
        return 'Recommendation displayed';
      },
    };
  }

  private handleTranscriptEvent(message: unknown): void {
    const payload = message as Record<string, unknown>;
    const text =
      (typeof payload?.['message'] === 'string' && payload['message']) ||
      (typeof payload?.['text'] === 'string' && payload['text']) ||
      (typeof payload?.['transcript'] === 'string' && payload['transcript']) ||
      (typeof message === 'string' ? message : '');

    const fromUser = payload?.['role'] === 'user' || payload?.['source'] === 'user';
    const role: TimelineRole = fromUser ? 'user' : 'assistant';

    if (text) {
      this.addTimeline(role, text);
    }

    if (role === 'assistant') {
      this.setUiState('speaking');
      if (this.handoffPending() && !this.whatsappHandoffDone) {
        this.scheduleHandoffAfterAgentReply();
      }
    } else {
      this.setUiState('listening');
    }
  }

  private scheduleHandoffAfterAgentReply(): void {
    if (this.handoffTimer) {
      clearTimeout(this.handoffTimer);
    }

    this.handoffTimer = setTimeout(() => {
      void this.completeHandoff();
    }, 5000);
  }

  private scheduleHandoffFallback(): void {
    this.handoffFallbackTimer = setTimeout(() => {
      if (!this.whatsappHandoffDone) {
        void this.completeHandoff();
      }
    }, 20000);
  }

  private clearHandoffTimers(): void {
    if (this.handoffTimer) {
      clearTimeout(this.handoffTimer);
      this.handoffTimer = undefined;
    }

    if (this.handoffFallbackTimer) {
      clearTimeout(this.handoffFallbackTimer);
      this.handoffFallbackTimer = undefined;
    }
  }

  private connectRealtimeBridge(): void {
    if (!this.isBrowser() || this.ws) {
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const url = `${protocol}//${window.location.host}/api/ws`;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.addTimeline('system', 'Realtime bridge connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data as string) as {
          type?: string;
          payload?: unknown;
        };
        this.handleRealtimeEvent(message.type ?? 'unknown', message.payload);
      } catch {
        this.addTimeline('system', 'Received malformed realtime event');
      }
    };

    this.ws.onerror = () => {
      this.addTimeline('system', 'Realtime bridge error');
    };

    this.ws.onclose = () => {
      this.ws = undefined;
      this.addTimeline('system', 'Realtime bridge disconnected');
    };
  }

  private disconnectRealtimeBridge(): void {
    this.ws?.close();
    this.ws = undefined;
  }

  private handleRealtimeEvent(type: string, payload: unknown): void {
    switch (type) {
      case 'lead_captured': {
        const lead = payload as Partial<LeadPayload> & { name?: string; brief?: string; need?: string };
        const brief = lead.brief ?? lead.need;
        if (lead.name && brief) {
          this.leadFormPending = false;
          this.confirmedLead.set({
            name: lead.name,
            brief,
            confirmedAt: new Date().toISOString(),
          });
          this.confirmation.set(`Lead captured for ${lead.name}.`);
          this.setUiState('success');
          this.addTimeline('tool', `Backend captured lead: ${lead.name}`);
        }
        break;
      }
      case 'show_recommendation': {
        const data = payload as { items?: VoiceRecommendation[]; summary?: string };
        if (data.items?.length) {
          this.recommendations.set(data.items);
        }
        if (data.summary) {
          this.addTimeline('assistant', data.summary);
        }
        this.setUiState('recommendation');
        break;
      }
      case 'set_state': {
        const state = (payload as { state?: VoiceUiState })?.state;
        if (state) {
          this.setUiState(state);
        }
        break;
      }
      case 'confirmation': {
        const message = (payload as { message?: string })?.message;
        if (message) {
          this.confirmation.set(message);
          this.setUiState('confirmation');
        }
        break;
      }
      default:
        break;
    }
  }

  private setUiState(state: VoiceUiState): void {
    if (this.leadFormPending && state !== 'lead_form') {
      return;
    }

    this.uiState.set(state);
  }

  private addTimeline(role: TimelineRole, text: string): void {
    const entry: TimelineEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      role,
      text,
      timestamp: new Date().toISOString(),
    };
    this.timeline.update((items) => [...items.slice(-39), entry]);
  }

  private async logEvent(event: string, payload: unknown): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post('/api/ai/event-log', {
          event,
          payload,
          uiState: this.uiState(),
          conversationId: this.conversationId(),
          createdAt: new Date().toISOString(),
        }),
      );
    } catch {
      // Soft-fail for telemetry only.
    }
  }

  private stringifyError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Unknown error';
  }

  private normalizeLeadFormParams(params?: LeadFormToolParams): Partial<LeadPayload> {
    if (!params) {
      return {};
    }

    const normalized: Partial<LeadPayload> = {};
    const name = this.readStringParam(params.name);
    const brief =
      this.readStringParam(params.brief) ??
      this.readStringParam(params.need) ??
      this.readStringParam(params.description);

    if (name) {
      normalized.name = name;
    }

    if (brief) {
      normalized.brief = brief;
    }

    return normalized;
  }

  private readStringParam(value: unknown): string | undefined {
    if (typeof value !== 'string') {
      return undefined;
    }

    const trimmed = value.trim();
    return trimmed || undefined;
  }

  private buildWhatsAppMessage(payload: LeadPayload): string {
    return [
      'Voice consultant inquiry',
      '',
      `Name: ${payload.name.trim()}`,
      `Brief: ${payload.brief.trim()}`,
    ].join('\n');
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof navigator !== 'undefined';
  }
}
