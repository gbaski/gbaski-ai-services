import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { getServicesByPriority } from '../../data/services.data';

@Component({
  selector: 'app-ai-services-section',
  standalone: true,
  imports: [ScrollRevealDirective, RouterLink],
  templateUrl: './ai-services-section.component.html',
  styleUrl: './ai-services-section.component.scss',
})
export class AiServicesSectionComponent {
  readonly featured = [
    ...getServicesByPriority('P0'),
    ...getServicesByPriority('P1').slice(0, 4),
  ];
}
