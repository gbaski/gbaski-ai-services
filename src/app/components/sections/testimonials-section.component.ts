import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TESTIMONIALS } from '../../data/social-proof.data';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './testimonials-section.component.html',
})
export class TestimonialsSectionComponent {
  readonly testimonials = TESTIMONIALS;
}
