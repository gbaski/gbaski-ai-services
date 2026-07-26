import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  viewChild,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  LucideActivity,
  LucideBox,
  LucideGauge,
  LucideListChecks,
  LucideScale,
  LucideSearch,
  LucideSlidersHorizontal,
  LucideTrendingUp,
  LucideTrophy,
  LucideUser,
} from '@lucide/angular';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

const REASONS = [
  {
    title: 'Enterprise Ready',
    description: 'Built for security, compliance, and long-term growth.',
    pattern: 'grid',
  },
  {
    title: 'Unified Platform',
    description: 'Bring models and workflows into one reliable system.',
    pattern: 'radial',
  },
  {
    title: 'Operational Visibility',
    description: 'Monitor performance clearly across teams and tools.',
    pattern: 'lines',
  },
  {
    title: 'Infrastructure',
    description: 'We provide a structured foundation for AI systems.',
    pattern: 'grid',
  },
];

const BENEFIT_BLOCKS = [
  {
    title: 'Production-Ready AI',
    description:
      'Replace scattered tools and unstable workflows with a unified foundation built for reliability.',
    tags: [
      { label: 'Faster Execution', icon: 'gauge' },
      { label: 'Confident Scalability', icon: 'trending' },
      { label: 'Complete Control', icon: 'sliders' },
    ],
    cta: 'Launch Your Stack',
    pattern: 'puzzle',
  },
  {
    title: 'Scale Without Breaking',
    description:
      'Transform early experiments into dependable, production-ready infrastructure.',
    tags: [
      { label: 'Operational Clarity', icon: 'search' },
      { label: 'Reliable Performance', icon: 'trophy' },
      { label: 'Sustainable Growth', icon: 'activity' },
    ],
    cta: 'Try Gbaski AI Services',
    pattern: 'brick',
  },
];

const PILLARS = [
  { title: 'Clarity', description: 'Replace scattered tools and experiments with foundation.', icon: 'box' },
  { title: 'Stability', description: 'Systems with reliability designed for real-world environments.', icon: 'scale' },
  { title: 'Control', description: 'Visibility, governance, and confidence across every deployment.', icon: 'user' },
];

@Component({
  selector: 'app-stacked-parallax-sections',
  standalone: true,
  imports: [
    LucideListChecks,
    LucideGauge,
    LucideTrendingUp,
    LucideSlidersHorizontal,
    LucideSearch,
    LucideTrophy,
    LucideActivity,
    LucideBox,
    LucideScale,
    LucideUser,
  ],
  templateUrl: './stacked-parallax-sections.component.html',
  styleUrl: './stacked-parallax-sections.component.scss',
})
export class StackedParallaxSectionsComponent implements AfterViewInit, OnDestroy {
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly ngZone = inject(NgZone);
  private readonly stackRoot = viewChild<ElementRef<HTMLElement>>('stackRoot');

  private scrollTriggers: ScrollTrigger[] = [];

  readonly reasons = REASONS;
  readonly benefitBlocks = BENEFIT_BLOCKS;
  readonly pillars = PILLARS;

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.initParallax());
    });
  }

  scrollTo(event: Event, target: string): void {
    event.preventDefault();
    this.smoothScroll.scrollTo(target, { offset: -20 });
  }

  private initParallax(): void {
    this.smoothScroll.initScrollTrigger();

    const root = this.stackRoot()?.nativeElement;
    if (!root) return;

    const panels = Array.from(root.querySelectorAll<HTMLElement>('.stacked-panel'));

    panels.forEach((panel, index) => {
      const inner = panel.querySelector<HTMLElement>('.panel-inner');

      if (inner && index < panels.length - 1) {
        const stackTrigger = ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(inner, {
              scale: 1 - progress * 0.06,
              opacity: 1 - progress * 0.35,
              filter: `brightness(${1 - progress * 0.25})`,
            });
          },
        });
        this.scrollTriggers.push(stackTrigger);
      }

      panel.querySelectorAll<HTMLElement>('.parallax-layer').forEach((layer) => {
        const speed = parseFloat(layer.dataset['speed'] ?? '0.2');
        const parallaxTrigger = gsap.to(layer, {
          y: () => speed * 120,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }).scrollTrigger;

        if (parallaxTrigger) {
          this.scrollTriggers.push(parallaxTrigger);
        }
      });
    });

    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach((t) => t.kill());
    this.scrollTriggers = [];
  }
}
