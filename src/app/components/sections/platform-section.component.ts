import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

const FEATURES = [
  {
    title: 'Workflow',
    description:
      'Design and manage AI workflows in a centralized system built for control.',
  },
  {
    title: 'Observability',
    description:
      'Monitor performance, logs, and system health with complete operational visibility.',
  },
  {
    title: 'Orchestration',
    description:
      'Coordinate multiple AI models within a unified platform built for reliability.',
  },
  {
    title: 'Operational',
    description:
      'Monitor system performance and usage through dashboards built for clarity.',
  },
  {
    title: 'Secure',
    description:
      'Protect data and infrastructure with safeguards built for enterprise security.',
  },
  {
    title: 'Scalable',
    description:
      'Run mission-critical AI workloads on systems built for consistent performance.',
  },
];

@Component({
  selector: 'app-platform-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './platform-section.component.html',
  styleUrl: './platform-section.component.scss',
})
export class PlatformSectionComponent {
  readonly features = FEATURES;
}
