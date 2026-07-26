import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, afterNextRender, computed, effect, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideBot } from '@lucide/angular';
import { LogoStripComponent } from '../logo-strip/logo-strip.component';
import { ShaderBackgroundComponent } from '../shader-background/shader-background.component';
import { VoiceConsultantCallbarComponent } from '../voice-consultant-callbar/voice-consultant-callbar.component';
import { VoiceAgentService } from '../../services/voice-agent.service';
import { VoiceWidgetService } from '../../services/voice-widget.service';
import { SmoothScrollService } from '../../services/smooth-scroll.service';
import {
  HeroTeamLead,
  getHeroTeamLeads,
  memberPhotoAlt,
  pickRandomTeamMembers,
} from '../../data/members.data';

interface ConnectorBox {
  left: number;
  right: number;
  top: number;
  bottom: number;
  cx: number;
  cy: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    LucideBot,
    RouterLink,
    LogoStripComponent,
    ShaderBackgroundComponent,
    VoiceConsultantCallbarComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private readonly voice = inject(VoiceAgentService);
  readonly widgetUi = inject(VoiceWidgetService);
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly ngZone = inject(NgZone);
  private readonly teamNetworkRef = viewChild<ElementRef<HTMLElement>>('teamNetwork');

  private connectorInitTimer?: ReturnType<typeof setTimeout>;
  private connectorFrame?: ReturnType<typeof requestAnimationFrame>;
  private linesResizeHandler?: () => void;
  private linesScrollUnsubscribe?: () => void;
  private networkResizeObserver?: ResizeObserver;
  private cardResizeObserver?: ResizeObserver;

  readonly headlineLines = [
    { text: 'AI automation, agents & CRM', accent: false },
    { text: 'that get work done', accent: true },
  ];

  readonly team: HeroTeamLead[] = getHeroTeamLeads();

  readonly extendedTeamMembers = signal<
    Array<{ name: string; photo: string; slug: string; jobTitle?: string }>
  >([]);

  constructor() {
    afterNextRender(() => {
      this.extendedTeamMembers.set(pickRandomTeamMembers(3));
      this.scheduleConnectorUpdate();
    });

    effect(() => {
      this.extendedTeamMembers();
      this.scheduleConnectorUpdate();
    });
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
      return 'End session';
    }

    return 'Talk to our AI consultant';
  });

  photoAlt(member: Pick<HeroTeamLead, 'name' | 'jobTitle'>, context: 'hero' | 'avatar' = 'hero'): string {
    return memberPhotoAlt(member, context);
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    this.linesResizeHandler = () => this.scheduleConnectorUpdate();

    window.addEventListener('resize', this.linesResizeHandler, { passive: true });
    window.addEventListener('load', this.linesResizeHandler, { passive: true });
    this.linesScrollUnsubscribe = this.smoothScroll.onScroll(() => this.scheduleConnectorUpdate());

    const networkEl = this.teamNetworkRef()?.nativeElement;
    if (networkEl && typeof ResizeObserver !== 'undefined') {
      this.networkResizeObserver = new ResizeObserver(() => this.scheduleConnectorUpdate());
      this.networkResizeObserver.observe(networkEl);

      this.cardResizeObserver = new ResizeObserver(() => this.scheduleConnectorUpdate());
      for (const id of ['team-lead-mariam', 'team-lead-wuyi', 'team-ai-agent', 'team-talent-pool']) {
        const card = document.getElementById(id);
        if (card) {
          this.cardResizeObserver.observe(card);
        }
      }
    }

    networkEl?.querySelectorAll('img').forEach((img) => {
      if (!(img instanceof HTMLImageElement) || img.complete) {
        return;
      }

      img.addEventListener('load', this.linesResizeHandler!, { once: true });
    });

    this.scheduleConnectorUpdate(320);
  }

  ngOnDestroy(): void {
    if (this.connectorInitTimer) {
      clearTimeout(this.connectorInitTimer);
    }
    if (this.connectorFrame) {
      cancelAnimationFrame(this.connectorFrame);
    }
    if (this.linesResizeHandler) {
      window.removeEventListener('resize', this.linesResizeHandler);
      window.removeEventListener('load', this.linesResizeHandler);
    }
    this.linesScrollUnsubscribe?.();
    this.networkResizeObserver?.disconnect();
    this.cardResizeObserver?.disconnect();
  }

  private scheduleConnectorUpdate(delayMs = 0): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.connectorInitTimer) {
      clearTimeout(this.connectorInitTimer);
    }

    this.connectorInitTimer = setTimeout(() => {
      if (this.connectorFrame) {
        cancelAnimationFrame(this.connectorFrame);
      }

      this.connectorFrame = requestAnimationFrame(() => {
        this.ngZone.runOutsideAngular(() => {
          this.updateTeamConnector();
        });
      });
    }, delayMs);
  }

  private isStackedTeamLayout(stack: Element, agent: HTMLElement): boolean {
    const stackRect = stack.getBoundingClientRect();
    const agentRect = agent.getBoundingClientRect();
    return agentRect.top >= stackRect.bottom - 12;
  }

  private toLocalBox(element: HTMLElement, networkRect: DOMRect): ConnectorBox {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left - networkRect.left,
      right: rect.right - networkRect.left,
      top: rect.top - networkRect.top,
      bottom: rect.bottom - networkRect.top,
      cx: rect.left - networkRect.left + rect.width / 2,
      cy: rect.top - networkRect.top + rect.height / 2,
    };
  }

  private clampX(value: number, width: number, pad = 3): number {
    return Math.max(pad, Math.min(width - pad, value));
  }

  private stackedConnectorPaths(
    networkWidth: number,
    mariamBox: ConnectorBox,
    wuyiBox: ConnectorBox,
    agentBox: ConnectorBox,
    poolBox: ConnectorBox,
  ): { bracket: string; pool: string } {
    const inset = Math.max(8, Math.min(14, networkWidth * 0.03));
    const trunkX = this.clampX(networkWidth - inset, networkWidth);
    const stackRight = Math.max(mariamBox.right, wuyiBox.right);
    const branchX = this.clampX(Math.min(trunkX, stackRight + Math.max(8, networkWidth * 0.03)), networkWidth);
    const mariamAttachX = this.clampX(mariamBox.right, networkWidth);
    const wuyiAttachX = this.clampX(wuyiBox.right, networkWidth);
    const agentAttachX = this.clampX(agentBox.cx, networkWidth);
    const poolAttachX = this.clampX(poolBox.cx, networkWidth);
    const poolAttachY = poolBox.top + 4;

    return {
      bracket: [
        `M ${mariamAttachX} ${mariamBox.cy}`,
        `H ${branchX}`,
        `V ${wuyiBox.cy}`,
        `H ${wuyiAttachX}`,
      ].join(' '),
      pool: [
        `M ${branchX} ${wuyiBox.cy}`,
        `V ${agentBox.cy}`,
        `H ${agentAttachX}`,
        `V ${poolAttachY}`,
        `H ${poolAttachX}`,
      ].join(' '),
    };
  }

  private inlineConnectorPaths(
    networkWidth: number,
    mariamBox: ConnectorBox,
    wuyiBox: ConnectorBox,
    agentBox: ConnectorBox,
    poolBox: ConnectorBox,
  ): { bracket: string; pool: string } {
    const stackRight = Math.max(mariamBox.right, wuyiBox.right);
    const joinY = (mariamBox.cy + wuyiBox.cy) / 2;
    const gap = Math.max(agentBox.left - stackRight, 12);
    const trunkX = this.clampX(stackRight + Math.max(gap * 0.45, 14), networkWidth);
    const mariamAttachX = this.clampX(mariamBox.right, networkWidth);
    const wuyiAttachX = this.clampX(wuyiBox.right, networkWidth);
    const agentLeft = this.clampX(agentBox.left, networkWidth);
    const agentRight = this.clampX(agentBox.right, networkWidth);
    const poolLeft = this.clampX(poolBox.left, networkWidth);

    return {
      bracket: [
        `M ${mariamAttachX} ${mariamBox.cy}`,
        `H ${trunkX}`,
        `V ${wuyiBox.cy}`,
        `H ${wuyiAttachX}`,
      ].join(' '),
      pool: [
        `M ${trunkX} ${joinY}`,
        `H ${agentLeft}`,
        `M ${agentRight} ${agentBox.cy}`,
        `H ${poolLeft}`,
      ].join(' '),
    };
  }

  private updateTeamConnector(): void {
    const network = this.teamNetworkRef()?.nativeElement;
    const svg = network?.querySelector<SVGSVGElement>('.hero-team__connector');
    const bracketPath = network?.querySelector<SVGPathElement>('.hero-team__connector-path--bracket');
    const poolPath = network?.querySelector<SVGPathElement>('.hero-team__connector-path--pool');

    if (!network || !svg || !bracketPath || !poolPath) {
      return;
    }

    const mariam = document.getElementById('team-lead-mariam');
    const wuyi = document.getElementById('team-lead-wuyi');
    const agent = document.getElementById('team-ai-agent');
    const pool = document.getElementById('team-talent-pool');

    if (!mariam || !wuyi || !agent || !pool) {
      svg.classList.remove('is-visible');
      bracketPath.setAttribute('d', '');
      poolPath.setAttribute('d', '');
      return;
    }

    const networkRect = network.getBoundingClientRect();
    if (networkRect.width <= 0 || networkRect.height <= 0) {
      return;
    }

    const mariamBox = this.toLocalBox(mariam, networkRect);
    const wuyiBox = this.toLocalBox(wuyi, networkRect);
    const agentBox = this.toLocalBox(agent, networkRect);
    const poolBox = this.toLocalBox(pool, networkRect);

    const stack = network.querySelector('.hero-team__stack');
    const paths =
      stack && this.isStackedTeamLayout(stack, agent)
        ? this.stackedConnectorPaths(networkRect.width, mariamBox, wuyiBox, agentBox, poolBox)
        : this.inlineConnectorPaths(networkRect.width, mariamBox, wuyiBox, agentBox, poolBox);

    bracketPath.setAttribute('d', paths.bracket);
    poolPath.setAttribute('d', paths.pool);

    svg.setAttribute('viewBox', `0 0 ${networkRect.width} ${networkRect.height}`);
    svg.classList.add('is-visible');
  }
}
