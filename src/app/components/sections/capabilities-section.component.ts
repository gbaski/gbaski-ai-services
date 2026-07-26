import { Component, inject } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

const CAPABILITIES = [
  {
    title: 'Centralized',
    description: 'Design, manage, and optimize AI workflows in one environment.',
  },
  {
    title: 'Support',
    description: 'Run and coordinate multiple AI models without fragmentation.',
  },
  {
    title: 'Deployment',
    description: 'Ship updates confidently with versioning and monitoring.',
  },
  {
    title: 'Monitoring',
    description: 'Track system health and usage with real-time operational visibility.',
  },
  {
    title: 'Security',
    description: 'Protect data and infrastructure with compliance-ready safeguards.',
  },
  {
    title: 'Scalable',
    description: 'Grow from early experiments to large-scale production systems.',
  },
];

const PILLARS = [
  {
    title: 'Clarity',
    description: 'Replace scattered tools and experiments with foundation.',
  },
  {
    title: 'Stability',
    description: 'Systems with reliability designed for real-world environments.',
  },
  {
    title: 'Control',
    description: 'Visibility, governance, and confidence across every deployment.',
  },
];

@Component({
  selector: 'app-capabilities-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './capabilities-section.component.html',
})
export class CapabilitiesSectionComponent {
  private readonly smoothScroll = inject(SmoothScrollService);
  readonly capabilities = CAPABILITIES;
  readonly pillars = PILLARS;

  scrollTo(event: Event, target: string): void {
    event.preventDefault();
    this.smoothScroll.scrollTo(target, { offset: -80 });
  }
}
