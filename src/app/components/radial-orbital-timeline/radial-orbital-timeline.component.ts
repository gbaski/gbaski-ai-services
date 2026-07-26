import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  LucideArrowRight,
  LucideBot,
  LucideDatabase,
  LucideLink,
  LucideMessageCircle,
  LucideMic,
  LucideSparkles,
  LucideWorkflow,
  LucideZap,
} from '@lucide/angular';

export type OrbitalItemStatus = 'completed' | 'in-progress' | 'pending';
export type OrbitalItemIcon =
  | 'bot'
  | 'mic'
  | 'message'
  | 'sparkles'
  | 'workflow'
  | 'database';

export interface OrbitalTimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: OrbitalItemIcon;
  relatedIds: number[];
  status: OrbitalItemStatus;
  energy: number;
}

interface NodePosition {
  x: number;
  y: number;
  zIndex: number;
  opacity: number;
}

@Component({
  selector: 'app-radial-orbital-timeline',
  standalone: true,
  imports: [
    LucideArrowRight,
    LucideBot,
    LucideDatabase,
    LucideLink,
    LucideMessageCircle,
    LucideMic,
    LucideSparkles,
    LucideWorkflow,
    LucideZap,
  ],
  templateUrl: './radial-orbital-timeline.component.html',
  styleUrl: './radial-orbital-timeline.component.scss',
})
export class RadialOrbitalTimelineComponent implements OnInit, OnDestroy {
  @Input({ required: true }) items: OrbitalTimelineItem[] = [];
  @Input() orbitRadius = 200;

  readonly expandedItems = signal<Record<number, boolean>>({});
  readonly pulseEffect = signal<Record<number, boolean>>({});
  readonly activeNodeId = signal<number | null>(null);
  readonly rotationAngle = signal(0);
  readonly autoRotate = signal(true);

  readonly centerOffset = { x: 0, y: 0 };

  private rotationTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.rotationTimer = setInterval(() => {
      if (!this.autoRotate()) return;
      this.rotationAngle.update((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
  }

  ngOnDestroy(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
    }
  }

  onContainerClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      target.classList.contains('orbital-root') ||
      target.classList.contains('orbital-stage') ||
      target.classList.contains('orbital-orbit')
    ) {
      this.resetView();
    }
  }

  toggleItem(id: number, event: Event): void {
    event.stopPropagation();

    const wasExpanded = this.expandedItems()[id] ?? false;
    const nextExpanded: Record<number, boolean> = {};

    if (!wasExpanded) {
      nextExpanded[id] = true;
      this.activeNodeId.set(id);
      this.autoRotate.set(false);

      const relatedPulse: Record<number, boolean> = {};
      this.getRelatedItems(id).forEach((relId) => {
        relatedPulse[relId] = true;
      });
      this.pulseEffect.set(relatedPulse);
      this.centerViewOnNode(id);
    } else {
      this.resetView();
      return;
    }

    this.expandedItems.set(nextExpanded);
  }

  getNodePosition(index: number, total: number): NodePosition {
    const angle = ((index / total) * 360 + this.rotationAngle()) % 360;
    const radian = (angle * Math.PI) / 180;
    const radius = this.getOrbitRadius();

    const x = radius * Math.cos(radian) + this.centerOffset.x;
    const y = radius * Math.sin(radian) + this.centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.78, Math.min(1, 0.78 + 0.22 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, zIndex, opacity };
  }

  getRelatedItems(itemId: number): number[] {
    return this.items.find((item) => item.id === itemId)?.relatedIds ?? [];
  }

  isRelatedToActive(itemId: number): boolean {
    const activeId = this.activeNodeId();
    if (!activeId) return false;
    return this.getRelatedItems(activeId).includes(itemId);
  }

  getItemById(id: number): OrbitalTimelineItem | undefined {
    return this.items.find((item) => item.id === id);
  }

  getStatusLabel(status: OrbitalItemStatus): string {
    switch (status) {
      case 'completed':
        return 'CORE';
      case 'in-progress':
        return 'POPULAR';
      case 'pending':
        return 'ADD-ON';
    }
  }

  getStatusClass(status: OrbitalItemStatus): string {
    switch (status) {
      case 'completed':
        return 'orbital-card__badge--completed';
      case 'in-progress':
        return 'orbital-card__badge--progress';
      case 'pending':
        return 'orbital-card__badge--pending';
    }
  }

  private centerViewOnNode(nodeId: number): void {
    const nodeIndex = this.items.findIndex((item) => item.id === nodeId);
    if (nodeIndex < 0) return;

    const targetAngle = (nodeIndex / this.items.length) * 360;
    this.rotationAngle.set(270 - targetAngle);
  }

  private resetView(): void {
    this.expandedItems.set({});
    this.activeNodeId.set(null);
    this.autoRotate.set(true);
    this.pulseEffect.set({});
  }

  private getOrbitRadius(): number {
    if (typeof window === 'undefined') {
      return this.orbitRadius;
    }
    return window.innerWidth < 768 ? Math.min(this.orbitRadius, 130) : this.orbitRadius;
  }
}
