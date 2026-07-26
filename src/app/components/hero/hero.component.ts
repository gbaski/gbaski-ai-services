import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoStripComponent } from '../logo-strip/logo-strip.component';
import { VoiceAgentService } from '../../services/voice-agent.service';
import { VoiceWidgetService } from '../../services/voice-widget.service';
import { CALENDLY_URL } from '../../config/booking.config';
import {
  HeroTeamLead,
  getHeroTeamLeads,
  memberPhotoAlt,
} from '../../data/members.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, LogoStripComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private readonly voice = inject(VoiceAgentService);
  readonly widgetUi = inject(VoiceWidgetService);

  readonly headlineLines = [
    { text: 'AI automation, agents & CRM', accent: false },
    { text: 'that get work done', accent: true },
  ];

  readonly team: HeroTeamLead[] = getHeroTeamLeads();

  openCalendly(): void {
    if (typeof window !== 'undefined') {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  }

  async openAiConsultant(): Promise<void> {
    if (this.voice.sessionActive() || this.voice.sessionStarting()) {
      this.widgetUi.openWidget();
      return;
    }

    this.widgetUi.openWidget();
    await this.voice.startSession();
  }

  readonly callbarDisabled = computed(
    () => this.voice.sessionStarting() || this.voice.sessionEnding(),
  );

  readonly callbarLabel = computed(() => {
    if (this.voice.sessionStarting()) {
      return 'Connecting…';
    }

    if (this.voice.sessionActive()) {
      return 'Open AI consultant';
    }

    return 'Talk to AI consultant';
  });

  photoAlt(member: Pick<HeroTeamLead, 'name' | 'jobTitle'>, context: 'hero' | 'avatar' = 'hero'): string {
    return memberPhotoAlt(member, context);
  }
}
