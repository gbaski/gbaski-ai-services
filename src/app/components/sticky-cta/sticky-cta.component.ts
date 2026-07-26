import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CALENDLY_URL } from '../../config/booking.config';

@Component({
  selector: 'app-sticky-cta',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="sticky-cta" role="region" aria-label="Book a discovery call">
      <p class="sticky-cta__copy font-mono-label">Ready to automate a workflow?</p>
      <div class="sticky-cta__actions">
        <button type="button" class="btn-pill btn-pill--primary btn-pill--sm" (click)="openCalendly()">
          Book a call
        </button>
        <a routerLink="/contact" class="sticky-cta__link">Contact</a>
      </div>
    </div>
  `,
  styles: `
    .sticky-cta {
      position: fixed;
      z-index: 60;
      left: 50%;
      bottom: 1rem;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.65rem 0.85rem 0.65rem 1rem;
      border-radius: 999px;
      background: var(--theme-bg-elevated);
      border: 1px solid var(--theme-border-subtle);
      backdrop-filter: blur(12px);
      max-width: calc(100vw - 1.5rem);
    }
    .sticky-cta__copy {
      margin: 0;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--theme-text-secondary);
      white-space: nowrap;
    }
    .sticky-cta__actions {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }
    .sticky-cta__link {
      font-size: 12px;
      color: var(--theme-text-muted);
      text-decoration: none;
    }
    @media (max-width: 640px) {
      .sticky-cta__copy {
        display: none;
      }
    }
  `,
})
export class StickyCtaComponent {
  @Output() book = new EventEmitter<void>();

  openCalendly(): void {
    this.book.emit();
    if (typeof window !== 'undefined') {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  }
}
