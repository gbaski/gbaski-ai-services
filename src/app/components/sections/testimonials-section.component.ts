import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

const TESTIMONIALS = [
  {
    quote: 'Deployment to monitoring, AI Services streamlined lifecycle.',
    name: 'Ethan Brooks',
    role: 'Lead Platform',
  },
  {
    quote: 'What impressed us most was the long-term thinking.',
    name: 'Daniel Foster',
    role: 'CTO',
  },
  {
    quote: 'AI Services gave us the structure we needed to move.',
    name: 'James Walker',
    role: 'Head Of AI',
  },
  {
    quote:
      'We were juggling models and workflows across multiple tools. AI Services unified everything into a scalable foundation.',
    name: 'Samantha Reed',
    role: 'Director Of Product',
  },
  {
    quote: 'AI Services helped us standardize our AI operations.',
    name: 'Charlotte Hayes',
    role: 'Head Of Operations',
  },
];

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './testimonials-section.component.html',
})
export class TestimonialsSectionComponent {
  readonly testimonials = TESTIMONIALS;
}
