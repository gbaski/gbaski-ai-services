import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SERVICE_AREAS_DISPLAY } from '../../seo/site-seo.config';
import { ServicesColumnMarqueeComponent } from '../services-column-marquee/services-column-marquee.component';

@Component({
  selector: 'app-ai-services-section',
  standalone: true,
  imports: [ScrollRevealDirective, ServicesColumnMarqueeComponent],
  templateUrl: './ai-services-section.component.html',
  styleUrl: './ai-services-section.component.scss',
})
export class AiServicesSectionComponent {
  readonly serviceAreas = SERVICE_AREAS_DISPLAY;
}
