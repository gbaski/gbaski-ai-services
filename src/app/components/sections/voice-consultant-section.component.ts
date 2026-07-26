import { Component, OnDestroy, computed, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ConfirmedLead,
  VoiceAgentService,
  VoiceUiState,
} from '../../services/voice-agent.service';
import { VoiceWidgetService } from '../../services/voice-widget.service';
import { VoiceConsultantCallbarComponent } from '../voice-consultant-callbar/voice-consultant-callbar.component';

@Component({
  selector: 'app-voice-consultant-section',
  standalone: true,
  imports: [ReactiveFormsModule, VoiceConsultantCallbarComponent],
  templateUrl: './voice-consultant-section.component.html',
  styleUrl: './voice-consultant-section.component.scss',
})
export class VoiceConsultantSectionComponent implements OnDestroy {
  readonly voice = inject(VoiceAgentService);
  readonly widgetUi = inject(VoiceWidgetService);
  private readonly fb = inject(FormBuilder);

  readonly leadForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    brief: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly stateLabel = computed(() => {
    if (this.voice.sessionStarting()) {
      return 'Connecting';
    }

    if (this.voice.sessionEnding()) {
      return 'Ending session';
    }

    if (this.showLeadForm()) {
      return 'Review details';
    }

    if (this.showLeadSummary()) {
      if (this.voice.handoffPending()) {
        return 'WhatsApp handoff';
      }

      if (this.voice.uiState() === 'success') {
        return 'Complete';
      }

      return 'Confirmed';
    }

    if (!this.voice.sessionActive()) {
      return this.voice.error() ? 'Unavailable' : 'Ready';
    }

    const stateMap: Record<VoiceUiState, string> = {
      idle: 'Ready',
      listening: 'Listening',
      speaking: 'Speaking',
      thinking: 'Processing',
      lead_form: 'Review details',
      recommendation: 'Recommendation',
      confirmation: 'Confirmed',
      success: 'Complete',
    };

    return stateMap[this.voice.uiState()];
  });

  readonly feedStatus = computed(() => {
    if (this.showLeadForm() || this.showLeadSummary()) {
      return null;
    }

    if (this.voice.sessionStarting()) {
      return 'Connecting to your consultant…';
    }

    if (this.voice.sessionEnding()) {
      return 'Ending session…';
    }

    if (!this.voice.sessionActive()) {
      return 'Tap below to start a voice conversation.';
    }

    if (this.voice.handoffPending()) {
      return 'Redirecting to WhatsApp shortly…';
    }

    switch (this.voice.uiState()) {
      case 'listening':
        return 'Speak now — your consultant is listening.';
      case 'speaking':
        return 'Your consultant is speaking.';
      case 'thinking':
        return 'Processing your request…';
      case 'recommendation':
        return 'Reviewing a service recommendation.';
      default:
        return 'Live conversation in progress.';
    }
  });

  readonly callbarDisabled = computed(
    () => this.voice.sessionStarting() || this.voice.sessionEnding(),
  );

  readonly callbarLabel = computed(() => {
    if (this.voice.sessionStarting()) {
      return 'Connecting…';
    }

    if (this.voice.sessionEnding()) {
      return 'Ending…';
    }

    if (this.voice.sessionActive()) {
      return 'End session';
    }

    return 'Talk to our AI consultant';
  });

  readonly confirmedLead = computed(() => this.voice.confirmedLead());

  readonly leadPreview = computed((): ConfirmedLead | null => this.confirmedLead());

  readonly showLeadForm = computed(() => this.voice.uiState() === 'lead_form');

  readonly showLeadSummary = computed(
    () => Boolean(this.confirmedLead()) && !this.showLeadForm(),
  );

  readonly showPlaceholder = computed(
    () => !this.showLeadForm() && !this.showLeadSummary() && !this.voice.error(),
  );

  private readonly syncDraftEffect = effect(() => {
    const draft = this.voice.leadDraft();
    this.leadForm.patchValue(
      {
        name: draft.name ?? '',
        brief: draft.brief ?? '',
      },
      { emitEvent: false },
    );
  });

  ngOnDestroy(): void {
    this.syncDraftEffect.destroy();
  }

  closeWidget(): void {
    this.widgetUi.closeWidget();
  }

  async startSession(): Promise<void> {
    if (this.voice.sessionActive() || this.voice.sessionStarting()) {
      this.widgetUi.openWidget();
      return;
    }

    this.widgetUi.openWidget();
    await this.voice.startSession();
  }

  async endSession(): Promise<void> {
    await this.voice.endSession();
  }

  async toggleSession(): Promise<void> {
    if (this.callbarDisabled()) {
      return;
    }

    if (this.voice.sessionActive()) {
      await this.endSession();
      return;
    }

    await this.startSession();
  }

  async confirmLead(): Promise<void> {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }
    await this.voice.confirmLead(this.leadForm.getRawValue());
  }

  leadField(label: string, value?: string): boolean {
    return Boolean(value?.trim());
  }
}
