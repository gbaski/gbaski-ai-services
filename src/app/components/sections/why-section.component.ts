import { Component, inject } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

const REASONS = [
  {
    title: 'Enterprise Ready',
    description: 'Built for security, compliance, and long-term growth.',
  },
  {
    title: 'Unified Platform',
    description: 'Bring models and workflows into one reliable system.',
  },
  {
    title: 'Operational Visibility',
    description: 'Monitor performance clearly across teams and tools.',
  },
  {
    title: 'Infrastructure',
    description: 'We provide a structured foundation for AI systems.',
  },
];

@Component({
  selector: 'app-why-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './why-section.component.html',
})
export class WhySectionComponent {
  private readonly smoothScroll = inject(SmoothScrollService);
  readonly reasons = REASONS;

  scrollTo(event: Event, target: string): void {
    event.preventDefault();
    this.smoothScroll.scrollTo(target, { offset: -80 });
  }
}
