import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideExternalLink } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ALL_PROJECTS, PROJECTS_PAGE_INTRO, Project } from '../../data/projects.data';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective, LucideExternalLink],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
})
export class ProjectsSectionComponent {
  readonly pageIntro = PROJECTS_PAGE_INTRO;
  readonly projects = ALL_PROJECTS;

  metricChips(project: Project): Array<{ label: string; value: string }> {
    return (project.metrics ?? []).slice(0, 3);
  }

  outcome(project: Project): string {
    return project.outcomeSummary ?? project.description.split('\n')[0] ?? '';
  }
}
