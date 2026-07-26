import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface RelatedLink {
  label: string;
  path: string;
  description?: string;
}

@Component({
  selector: 'app-related-pages',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="related" aria-labelledby="related-heading">
      <p class="section-eyebrow mb-3">{{ eyebrow }}</p>
      <h2 id="related-heading" class="section-heading mb-6">{{ heading }}</h2>
      <div class="related__grid">
        @for (link of links; track link.path) {
          <a [routerLink]="link.path" class="related__card theme-card">
            <span class="related__label font-heading">{{ link.label }}</span>
            @if (link.description) {
              <span class="related__desc theme-text-muted">{{ link.description }}</span>
            }
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    .related__grid {
      display: grid;
      gap: 0.85rem;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
    .related__card {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      padding: 1rem 1.1rem;
      border-radius: 1rem;
      text-decoration: none;
      border: 1px solid var(--theme-border-subtle);
      transition: border-color 0.2s ease;
    }
    .related__card:hover {
      border-color: var(--theme-accent);
    }
    .related__label {
      color: var(--theme-text);
      font-weight: 600;
      font-size: 0.95rem;
    }
    .related__desc {
      font-size: 0.85rem;
      line-height: 1.5;
    }
  `,
})
export class RelatedPagesComponent {
  @Input() eyebrow = 'Keep exploring';
  @Input() heading = 'Related pages';
  @Input({ required: true }) links: RelatedLink[] = [];
}
