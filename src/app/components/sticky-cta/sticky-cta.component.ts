import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CALENDLY_URL } from '../../config/booking.config';

@Component({
  selector: 'app-sticky-cta',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (visible()) {
      <div class="sticky-cta" role="region" aria-label="Book a discovery call">
        <p class="sticky-cta__copy font-mono-label">Ready to automate?</p>
        <div class="sticky-cta__actions">
          <button type="button" class="btn-pill btn-pill--primary sticky-cta__book" (click)="openCalendly()">
            Book a call
          </button>
          <a routerLink="/contact" class="sticky-cta__link">Contact</a>
        </div>
      </div>
    }
  `,
  styles: `
    .sticky-cta {
      display: none;
    }

    @media (max-width: 767.98px) {
      .sticky-cta {
        position: fixed;
        z-index: 40;
        left: 50%;
        bottom: max(0.75rem, env(safe-area-inset-bottom));
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 0.65rem 0.5rem 0.9rem;
        border-radius: 999px;
        background: var(--theme-bg-elevated);
        border: 1px solid var(--theme-border-subtle);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        backdrop-filter: blur(12px);
        max-width: calc(100vw - 1.5rem);
      }

      .sticky-cta__copy {
        margin: 0;
        font-size: 0.8125rem;
        letter-spacing: 0;
        text-transform: none;
        font-weight: 500;
        color: var(--theme-muted);
        white-space: nowrap;
      }

      .sticky-cta__actions {
        display: flex;
        align-items: center;
        gap: 0.35rem;
      }

      .sticky-cta__book {
        min-height: 44px;
        min-width: 44px;
        padding-inline: 1rem;
      }

      .sticky-cta__link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        min-width: 44px;
        padding: 0 0.75rem;
        font-size: 13px;
        font-weight: 500;
        color: var(--theme-text-muted);
        text-decoration: none;
      }
    }

    @media (max-width: 420px) {
      .sticky-cta__copy {
        display: none;
      }
    }
  `,
})
export class StickyCtaComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private readonly intersecting = new Set<Element>();

  @Output() book = new EventEmitter<void>();

  readonly visible = signal(true);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const targets = [
      ...Array.from(document.querySelectorAll('.page-cta')),
      ...Array.from(document.querySelectorAll('.site-footer')),
    ];

    if (!targets.length) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.intersecting.add(entry.target);
          } else {
            this.intersecting.delete(entry.target);
          }
        }
        this.visible.set(this.intersecting.size === 0);
      },
      {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    targets.forEach((el) => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  openCalendly(): void {
    this.book.emit();
    if (typeof window !== 'undefined') {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  }
}
