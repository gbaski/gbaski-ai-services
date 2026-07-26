import { Component } from '@angular/core';
import { PRICING_TIERS } from '../../data/social-proof.data';

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  template: `
    <section id="pricing" class="theme-section px-6 py-24 md:px-10 md:py-32 lg:px-14" aria-labelledby="pricing-heading">
      <div class="mx-auto max-w-[1400px]">
        <p class="section-eyebrow mb-4">Engagements</p>
        <h2 id="pricing-heading" class="section-heading max-w-2xl">
          Pricing that matches how buyers hire
        </h2>
        <p class="section-body mt-5 max-w-2xl">
          Scoped pilots typically start in the low thousands (USD). Larger programmes are quoted after discovery, with clear deliverables, not open-ended burn.
        </p>
        <div class="pricing-grid mt-12">
          @for (tier of tiers; track tier.id) {
            <article class="pricing-card theme-card">
              <p class="pricing-card__eyebrow font-mono-label">{{ tier.name }}</p>
              <h3 class="pricing-card__title font-heading">{{ tier.summary }}</h3>
              <p class="pricing-card__fits theme-text-muted">{{ tier.fits }}</p>
              <p class="pricing-card__from font-mono-label">{{ tier.fromLabel }}</p>
              <ul class="pricing-card__list">
                @for (feature of tier.features; track feature) {
                  <li>{{ feature }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .pricing-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    .pricing-card {
      padding: 1.5rem;
      border-radius: 1.25rem;
      border: 1px solid var(--theme-border-subtle);
    }
    .pricing-card__eyebrow {
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--theme-text-secondary);
      margin: 0 0 0.75rem;
    }
    .pricing-card__title {
      font-size: 1.15rem;
      font-weight: 600;
      margin: 0 0 0.75rem;
      letter-spacing: -0.02em;
    }
    .pricing-card__fits {
      margin: 0 0 1rem;
      line-height: 1.6;
      font-size: 0.92rem;
    }
    .pricing-card__from {
      margin: 0 0 1rem;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--theme-accent);
    }
    .pricing-card__list {
      margin: 0;
      padding-left: 1.1rem;
      color: var(--theme-text-muted);
      line-height: 1.7;
      font-size: 0.92rem;
    }
  `,
})
export class PricingSectionComponent {
  readonly tiers = PRICING_TIERS;
}
