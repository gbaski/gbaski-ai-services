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
import { INDUSTRY_HUB, INDUSTRY_PAGES, IndustryPage, getIndustryBySlug } from '../../data/industries.data';
import { getServiceBySlug } from '../../data/services.data';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from '../../data/schema.helpers';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-industries-hub',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BreadcrumbsComponent, PageCtaComponent, StickyCtaComponent, RouterLink],
  template: `
    <app-header />
    <main class="theme-bg theme-text px-6 py-10 md:px-10 lg:px-14">
      <div class="mx-auto max-w-[1200px] pb-24">
        <app-breadcrumbs [items]="[{ label: 'Home', path: '/' }, { label: 'Industries' }]" />
        <h1 class="font-heading" style="font-size:clamp(2rem,4vw,3rem);font-weight:600;letter-spacing:-0.03em;margin:0">
          {{ hub.h1 }}
        </h1>
        <p class="section-body mt-5 max-w-3xl">{{ hub.lead }}</p>
        <div style="display:grid;gap:0.85rem;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));margin-top:3rem">
          @for (page of pages; track page.slug) {
            <a class="theme-card" style="display:grid;gap:0.4rem;padding:1.15rem;border-radius:1rem;text-decoration:none;border:1px solid var(--theme-border-subtle);color:inherit"
              [routerLink]="['/industries', page.slug]">
              <span class="font-heading" style="font-weight:600">{{ page.name }}</span>
              <span class="theme-text-muted">{{ page.angle }}</span>
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
export class IndustriesHubComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  readonly hub = INDUSTRY_HUB;
  readonly pages = INDUSTRY_PAGES;

  ngOnInit(): void {
    this.seo.setPageMeta({ title: this.hub.metaTitle, description: this.hub.metaDescription, path: '/industries' });
    this.seo.setJsonLd('json-ld-breadcrumb', buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries' },
    ]));
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('json-ld-breadcrumb');
  }
}

@Component({
  selector: 'app-industry-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    PageCtaComponent,
    RelatedPagesComponent,
    StickyCtaComponent,
    DiscoveryCallDialogComponent,
    RouterLink,
  ],
  template: `
    @if (page; as p) {
      <app-header />
      <main class="theme-bg theme-text px-6 py-10 md:px-10 lg:px-14">
        <div class="mx-auto max-w-[1200px] pb-24">
          <app-breadcrumbs [items]="[
            { label: 'Home', path: '/' },
            { label: 'Industries', path: '/industries' },
            { label: p.name }
          ]" />
          <p class="section-eyebrow mb-4">{{ p.angle }}</p>
          <h1 class="font-heading" style="font-size:clamp(2rem,4vw,3rem);font-weight:600;letter-spacing:-0.03em;margin:0">{{ p.h1 }}</h1>
          <p class="section-body mt-5 max-w-3xl">{{ p.lead }}</p>
          <div class="service-hero__actions mt-8" style="display:flex;gap:0.75rem;flex-wrap:wrap">
            <button type="button" class="btn-pill btn-pill--primary" (click)="discoveryOpen.set(true)">Book a discovery call</button>
            <a routerLink="/services" class="btn-pill btn-pill--outline">Browse services</a>
          </div>
          <div style="display:grid;gap:2rem;margin-top:3rem" class="md:grid-cols-2">
            <section>
              <h2 class="section-heading">Challenges we see</h2>
              <ul class="section-body mt-4" style="padding-left:1.1rem">
                @for (item of p.challenges; track item) { <li>{{ item }}</li> }
              </ul>
            </section>
            <section>
              <h2 class="section-heading">How we help</h2>
              <ul class="section-body mt-4" style="padding-left:1.1rem">
                @for (item of p.solutions; track item) { <li>{{ item }}</li> }
              </ul>
            </section>
          </div>
          <section class="mt-14">
            <h2 class="section-heading mb-6">FAQ</h2>
            @for (faq of p.faqs; track faq.question) {
              <details class="theme-card" style="padding:1rem;border-radius:1rem;border:1px solid var(--theme-border-subtle);margin-bottom:0.75rem">
                <summary class="font-heading" style="font-weight:600;cursor:pointer">{{ faq.question }}</summary>
                <p class="theme-text-muted" style="margin:0.75rem 0 0;line-height:1.65">{{ faq.answer }}</p>
              </details>
            }
          </section>
          <div class="mt-16"><app-page-cta (book)="discoveryOpen.set(true)" /></div>
          <div class="mt-12">
            <app-related-pages heading="Recommended services" [links]="serviceLinks()" />
          </div>
        </div>
      </main>
      <app-footer />
      <app-sticky-cta (book)="discoveryOpen.set(true)" />
      <app-discovery-call-dialog [open]="discoveryOpen()" (closed)="discoveryOpen.set(false)" />
    }
  `,
})
export class IndustryPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);
  page?: IndustryPage;
  readonly discoveryOpen = signal(false);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const page = getIndustryBySlug(params.get('slug') ?? '');
      if (!page) {
        void this.router.navigateByUrl('/404');
        return;
      }
      this.page = page;
      const path = `/industries/${page.slug}`;
      this.seo.setPageMeta({ title: page.metaTitle, description: page.metaDescription, path });
      this.seo.setJsonLd('json-ld-breadcrumb', buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Industries', path: '/industries' },
        { name: page.name, path },
      ]));
      this.seo.setJsonLd('json-ld-service', buildServiceJsonLd({
        name: `AI Automation for ${page.name}`,
        description: page.metaDescription,
        path,
      }));
      this.seo.setJsonLd('json-ld-faq', buildFaqJsonLd(page.faqs));
    });
  }

  ngOnDestroy(): void {
    ['json-ld-breadcrumb', 'json-ld-service', 'json-ld-faq'].forEach((id) => this.seo.removeJsonLd(id));
  }

  serviceLinks() {
    return (this.page?.relatedServiceSlugs ?? [])
      .map((slug) => getServiceBySlug(slug))
      .filter(Boolean)
      .map((s) => ({ label: s!.name, path: `/services/${s!.slug}`, description: s!.targetKeyword }));
  }
}
