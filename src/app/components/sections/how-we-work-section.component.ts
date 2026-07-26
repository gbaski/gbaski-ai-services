import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discovery',
    title: 'Discovery',
    description:
      'We map your goals, workflows, and stack, then define scope, success metrics, and a delivery plan.',
  },
  {
    id: 'build',
    title: 'Build',
    description:
      'We design and implement automations, agents, and integrations tailored to how your team operates.',
  },
  {
    id: 'deploy',
    title: 'Deploy',
    description:
      'We ship to production with testing, documentation, and handoff so your team can run with confidence.',
  },
  {
    id: 'support',
    title: 'Support',
    description:
      'We stay available for monitoring, updates, and improvements as your business and tools evolve.',
  },
];

@Component({
  selector: 'app-how-we-work-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './how-we-work-section.component.html',
  styleUrl: './how-we-work-section.component.scss',
})
export class HowWeWorkSectionComponent {
  readonly steps = PROCESS_STEPS;

  stepIndex(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
