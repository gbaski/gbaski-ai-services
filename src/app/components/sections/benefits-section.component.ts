import { Component, inject } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

const BENEFIT_BLOCKS = [
  {
    title: 'Production-Ready AI',
    description:
      'Replace scattered tools and unstable workflows with a unified foundation built for reliability.',
    tags: ['Faster Execution', 'Confident Scalability', 'Complete Control'],
    cta: 'Launch Your Stack',
  },
  {
    title: 'Scale Without Breaking',
    description:
      'Transform early experiments into dependable, production-ready infrastructure.',
    tags: ['Operational Clarity', 'Reliable Performance', 'Sustainable Growth'],
    cta: 'Try AI Services',
  },
];

@Component({
  selector: 'app-benefits-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './benefits-section.component.html',
})
export class BenefitsSectionComponent {
  private readonly smoothScroll = inject(SmoothScrollService);
  readonly blocks = BENEFIT_BLOCKS;

  scrollTo(event: Event, target: string): void {
    event.preventDefault();
    this.smoothScroll.scrollTo(target, { offset: -80 });
  }
}
