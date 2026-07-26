import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PageCtaComponent } from '../../components/page-cta/page-cta.component';
import { StickyCtaComponent } from '../../components/sticky-cta/sticky-cta.component';
import { SERVICE_HUB, SERVICE_PAGES } from '../../data/services.data';
import { buildBreadcrumbJsonLd } from '../../data/schema.helpers';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-services-hub',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    PageCtaComponent,
    StickyCtaComponent,
    RouterLink,
  ],
  template: `
    <app-header />
    <main class="theme-bg theme-text px-6 py-10 md:px-10 md:py-14 lg:px-14">
      <div class="mx-auto max-w-[1400px] pb-24">
        <app-breadcrumbs [items]="[{ label: 'Home', path: '/' }, { label: 'Services' }]" />
        <h1 class="hub-title font-heading">{{ hub.h1 }}</h1>
        <p class="section-body mt-5 max-w-3xl">{{ hub.lead }}</p>
        <div class="hub-grid mt-12">
          @for (page of pages; track page.slug) {
            <a class="hub-card theme-card" [routerLink]="['/services', page.slug]">
              <span class="font-mono-label hub-card__priority">{{ page.priority }} · {{ page.category }}</span>
              <span class="hub-card__title font-heading">{{ page.name }}</span>
              <span class="theme-text-muted">{{ page.lead }}</span>
            </a>
          }
        </div>
        <div class="mt-16"><app-page-cta [showCalendly]="false" /></div>
      </div>
    </main>
    <app-footer />
    <app-sticky-cta />
  `,
  styles: `
    .hub-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; letter-spacing: -0.03em; margin: 0; }
    .hub-grid { display: grid; gap: 0.85rem; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
    .hub-card { display: grid; gap: 0.5rem; padding: 1.2rem; border-radius: 1rem; text-decoration: none; border: 1px solid var(--theme-border-subtle); color: inherit; }
    .hub-card__priority { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--theme-text-secondary); }
    .hub-card__title { font-weight: 600; font-size: 1.05rem; }
  `,
})
export class ServicesHubComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  readonly hub = SERVICE_HUB;
  readonly pages = SERVICE_PAGES;

  ngOnInit(): void {
    this.seo.setPageMeta({
      title: this.hub.metaTitle,
      description: this.hub.metaDescription,
      path: '/services',
    });
    this.seo.setJsonLd(
      'json-ld-breadcrumb',
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
    );
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('json-ld-breadcrumb');
  }
}
