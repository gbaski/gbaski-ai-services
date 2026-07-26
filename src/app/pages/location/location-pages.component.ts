import { Component, DestroyRef, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DiscoveryCallDialogComponent } from '../../components/discovery-call-dialog/discovery-call-dialog.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PageCtaComponent } from '../../components/page-cta/page-cta.component';
import { RelatedPagesComponent } from '../../components/related-pages/related-pages.component';
import { StickyCtaComponent } from '../../components/sticky-cta/sticky-cta.component';
import { LOCATION_HUB, LOCATION_PAGES, LocationPage, getLocationBySlug } from '../../data/locations.data';
import { getServiceBySlug } from '../../data/services.data';
import { buildBreadcrumbJsonLd, buildServiceJsonLd } from '../../data/schema.helpers';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-locations-hub',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BreadcrumbsComponent, PageCtaComponent, StickyCtaComponent, RouterLink],
  template: `
    <app-header />
    <main class="theme-bg theme-text px-6 py-10 md:px-10 lg:px-14">
      <div class="mx-auto max-w-[1400px] pb-24">
        <app-breadcrumbs [items]="[{ label: 'Home', path: '/' }, { label: 'Locations' }]" />
        <h1 class="font-heading" style="font-size:clamp(2rem,4vw,3rem);font-weight:600;margin:0">{{ hub.h1 }}</h1>
        <p class="section-body mt-5 max-w-3xl">{{ hub.lead }}</p>
        <div style="display:grid;gap:0.85rem;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));margin-top:3rem">
          @for (page of pages; track page.slug) {
            <a class="theme-card" style="display:grid;gap:0.35rem;padding:1.15rem;border-radius:1rem;text-decoration:none;border:1px solid var(--theme-border-subtle);color:inherit"
              [routerLink]="['/locations', page.slug]">
              <span class="font-mono-label" style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--theme-text-secondary)">{{ page.regionLabel }}</span>
              <span class="font-heading" style="font-weight:600">{{ page.name }}</span>
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
})
export class LocationsHubComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  readonly hub = LOCATION_HUB;
  readonly pages = LOCATION_PAGES;

  ngOnInit(): void {
    this.seo.setPageMeta({ title: this.hub.metaTitle, description: this.hub.metaDescription, path: '/locations' });
    this.seo.setJsonLd('json-ld-breadcrumb', buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Locations', path: '/locations' },
    ]));
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('json-ld-breadcrumb');
  }
}

@Component({
  selector: 'app-location-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    PageCtaComponent,
    RelatedPagesComponent,
    StickyCtaComponent,
    DiscoveryCallDialogComponent,
  ],
  template: `
    @if (page; as p) {
      <app-header />
      <main class="theme-bg theme-text px-6 py-10 md:px-10 lg:px-14">
        <div class="mx-auto max-w-[1400px] pb-24">
          <app-breadcrumbs [items]="[
            { label: 'Home', path: '/' },
            { label: 'Locations', path: '/locations' },
            { label: p.name }
          ]" />
          <p class="section-eyebrow mb-4">{{ p.regionLabel }}</p>
          <h1 class="font-heading" style="font-size:clamp(2rem,4vw,3rem);font-weight:600;margin:0">{{ p.h1 }}</h1>
          <p class="section-body mt-5 max-w-3xl">{{ p.lead }}</p>
          <div class="mt-8">
            @for (para of p.body; track para) {
              <p class="section-body mb-4 max-w-3xl">{{ para }}</p>
            }
          </div>
          <h2 class="section-heading mt-12">Service focus</h2>
          <ul class="section-body mt-4" style="padding-left:1.1rem">
            @for (item of p.serviceFocus; track item) { <li>{{ item }}</li> }
          </ul>
          <div class="mt-16"><app-page-cta (book)="discoveryOpen.set(true)" /></div>
          <div class="mt-12">
            <app-related-pages heading="Start with these services" [links]="serviceLinks()" />
          </div>
        </div>
      </main>
      <app-footer />
      <app-sticky-cta (book)="discoveryOpen.set(true)" />
      <app-discovery-call-dialog [open]="discoveryOpen()" (closed)="discoveryOpen.set(false)" />
    }
  `,
})
export class LocationPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);
  page?: LocationPage;
  readonly discoveryOpen = signal(false);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const page = getLocationBySlug(params.get('slug') ?? '');
      if (!page) {
        void this.router.navigateByUrl('/404');
        return;
      }
      this.page = page;
      const path = `/locations/${page.slug}`;
      this.seo.setPageMeta({ title: page.metaTitle, description: page.metaDescription, path });
      this.seo.setJsonLd('json-ld-breadcrumb', buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Locations', path: '/locations' },
        { name: page.name, path },
      ]));
      this.seo.setJsonLd('json-ld-service', buildServiceJsonLd({
        name: `AI Services, ${page.name}`,
        description: page.metaDescription,
        path,
      }));
    });
  }

  ngOnDestroy(): void {
    ['json-ld-breadcrumb', 'json-ld-service'].forEach((id) => this.seo.removeJsonLd(id));
  }

  serviceLinks() {
    return (this.page?.relatedServiceSlugs ?? [])
      .map((slug) => getServiceBySlug(slug))
      .filter(Boolean)
      .map((s) => ({ label: s!.name, path: `/services/${s!.slug}` }));
  }
}
