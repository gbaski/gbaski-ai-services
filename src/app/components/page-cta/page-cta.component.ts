import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CALENDLY_EMBED, CALENDLY_URL } from '../../config/booking.config';
import { ORGANIZATION } from '../../seo/site-seo.config';

@Component({
  selector: 'app-page-cta',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-cta theme-bg-elevated" [class.page-cta--compact]="compact">
      <div class="page-cta__inner">
        <div class="page-cta__copy">
          <p class="section-eyebrow mb-3">{{ eyebrow }}</p>
          <h2 class="page-cta__title font-heading">{{ title }}</h2>
          <p class="page-cta__lead theme-text-muted">{{ lead }}</p>
          <div class="page-cta__actions">
            <button type="button" class="btn-pill btn-pill--primary" (click)="onBook()">
              {{ primaryLabel }}
            </button>
            <a routerLink="/contact" class="btn-pill btn-pill--outline">Contact</a>
            <a
              class="page-cta__whatsapp font-mono-label"
              [href]="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
        @if (showCalendly && calendlyEnabled) {
          <div class="page-cta__calendly">
            <iframe
              title="Book a discovery call"
              [src]="calendlySafeUrl"
              loading="lazy"
            ></iframe>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .page-cta {
      border-radius: 1.25rem;
      padding: 1.75rem;
      border: 1px solid var(--theme-border-subtle);
    }
    .page-cta--compact {
      padding: 1.25rem;
    }
    .page-cta__inner {
      display: grid;
      gap: 1.5rem;
    }
    @media (min-width: 960px) {
      .page-cta__inner {
        grid-template-columns: 1.1fr 0.9fr;
        align-items: start;
      }
    }
    .page-cta__title {
      font-size: clamp(1.35rem, 2vw, 1.85rem);
      font-weight: 600;
      letter-spacing: -0.02em;
      margin: 0 0 0.75rem;
    }
    .page-cta__lead {
      margin: 0 0 1.25rem;
      line-height: 1.65;
      max-width: 36rem;
    }
    .page-cta__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }
    .page-cta__whatsapp {
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--theme-text-secondary);
      text-decoration: none;
    }
    .page-cta__calendly {
      min-height: 420px;
      border-radius: 1rem;
      overflow: hidden;
      border: 1px solid var(--theme-border-subtle);
      background: var(--theme-bg);
    }
    .page-cta__calendly iframe {
      width: 100%;
      height: 420px;
      border: 0;
    }
  `,
})
export class PageCtaComponent {
  @Input() eyebrow = 'Next step';
  @Input() title = 'Book a discovery call';
  @Input() lead =
    'Tell us which workflow is costing time or revenue. We will map the stack, estimate effort, and connect you with the people who build it.';
  @Input() primaryLabel = 'Book a discovery call';
  @Input() showCalendly = true;
  @Input() compact = false;
  @Output() book = new EventEmitter<void>();

  readonly calendlyEnabled = CALENDLY_EMBED;
  readonly whatsappUrl = ORGANIZATION.contactUrl;
  readonly calendlySafeUrl: SafeResourceUrl;

  constructor(sanitizer: DomSanitizer) {
    const url = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0b0e13&text_color=e7ebf2&primary_color=e8cf2a`;
    this.calendlySafeUrl = sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onBook(): void {
    this.book.emit();
    if (typeof window !== 'undefined' && CALENDLY_URL) {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  }
}
