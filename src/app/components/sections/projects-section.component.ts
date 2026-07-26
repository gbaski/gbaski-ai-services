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
import { ProjectCardComponent } from '../projects/project-card.component';
import { PROJECTS_PAGE_INTRO, PROJECT_CATEGORY_GROUPS } from '../../data/projects.data';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

const PARALLAX_PATTERNS = ['grid', 'radial', 'lines', 'mesh', 'puzzle', 'brick'] as const;

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
})
export class ProjectsSectionComponent implements AfterViewInit, OnDestroy {
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly ngZone = inject(NgZone);
  private readonly stackRoot = viewChild<ElementRef<HTMLElement>>('stackRoot');

  private scrollTriggers: ScrollTrigger[] = [];

  readonly pageIntro = PROJECTS_PAGE_INTRO;
  readonly projects = PROJECT_CATEGORY_GROUPS.flatMap((group) => group.projects);

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.initParallax());
      setTimeout(() => ScrollTrigger.refresh(), 800);
    });
  }

  patternFor(index: number): string {
    return PARALLAX_PATTERNS[index % PARALLAX_PATTERNS.length];
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
        const parallaxTrigger = gsap
          .to(layer, {
            y: () => speed * 120,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
          .scrollTrigger;

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
