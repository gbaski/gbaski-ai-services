import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideExternalLink } from '@lucide/angular';
import type { Project } from '../../data/projects.data';
import { ProjectAutomationFlowComponent } from './project-automation-flow.component';
import { ProjectGalleryComponent } from './project-gallery.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [ProjectGalleryComponent, ProjectAutomationFlowComponent, LucideExternalLink, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();

  descriptionParagraphs(): string[] {
    return this.project()
      .description.split('\n\n')
      .map((part) => part.trim())
      .filter(Boolean);
  }
}
