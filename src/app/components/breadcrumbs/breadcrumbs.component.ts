import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="breadcrumbs font-mono-label" aria-label="Breadcrumb">
      <ol class="breadcrumbs__list">
        @for (item of items; track item.label; let last = $last) {
          <li class="breadcrumbs__item">
            @if (!last && item.path) {
              <a [routerLink]="item.path" class="breadcrumbs__link">{{ item.label }}</a>
              <span class="breadcrumbs__sep" aria-hidden="true">/</span>
            } @else {
              <span class="breadcrumbs__current" aria-current="page">{{ item.label }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: `
    .breadcrumbs {
      margin-bottom: 1.25rem;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--theme-text-secondary);
    }
    .breadcrumbs__list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .breadcrumbs__item {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
    .breadcrumbs__link {
      color: inherit;
      text-decoration: none;
    }
    .breadcrumbs__link:hover {
      color: var(--theme-text);
    }
    .breadcrumbs__current {
      color: var(--theme-text-muted);
    }
    .breadcrumbs__sep {
      opacity: 0.5;
    }
  `,
})
export class BreadcrumbsComponent {
  @Input({ required: true }) items: BreadcrumbItem[] = [];
}
