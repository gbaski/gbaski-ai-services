import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DiscoveryCallDialogComponent } from '../../components/discovery-call-dialog/discovery-call-dialog.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PageCtaComponent } from '../../components/page-cta/page-cta.component';
import { RelatedPagesComponent } from '../../components/related-pages/related-pages.component';
import { StickyCtaComponent } from '../../components/sticky-cta/sticky-cta.component';
import { getIndustryBySlug } from '../../data/industries.data';
import { getProjectById } from '../../data/projects.data';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildHowToJsonLd,
  buildServiceJsonLd,
  buildSpeakableJsonLd,
} from '../../data/schema.helpers';
import { MarketingPage, getRelatedServices, getServiceBySlug } from '../../data/services.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-service-page',
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
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss',
})
export class ServicePageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  page?: MarketingPage;
  readonly discoveryOpen = signal(false);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.load(params.get('slug') ?? '');
    });
  }

  private load(slug: string): void {
    const page = getServiceBySlug(slug);
    if (!page) {
      void this.router.navigateByUrl('/404');
      return;
    }
    this.page = page;
    const path = `/services/${page.slug}`;
    this.seo.setPageMeta({
      title: page.metaTitle,
      description: page.metaDescription,
      keywords: [page.targetKeyword, ...page.secondaryKeywords].join(', '),
      path,
    });
    this.seo.setJsonLd(
      'json-ld-breadcrumb',
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: page.name, path },
      ]),
    );
    this.seo.setJsonLd(
      'json-ld-service',
      buildServiceJsonLd({
        name: page.name,
        description: page.metaDescription,
        path,
        serviceType: page.targetKeyword,
      }),
    );
    this.seo.setJsonLd('json-ld-faq', buildFaqJsonLd(page.faqs));
    this.seo.setJsonLd(
      'json-ld-howto',
      buildHowToJsonLd({
        name: `How we deliver ${page.name}`,
        description: page.lead,
        steps: page.process,
      }),
    );
    this.seo.setJsonLd(
      'json-ld-speakable',
      buildSpeakableJsonLd(path, ['.service-hero__h1', '.service-hero__lead']),
    );
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    ['json-ld-breadcrumb', 'json-ld-service', 'json-ld-faq', 'json-ld-howto', 'json-ld-speakable'].forEach(
      (id) => this.seo.removeJsonLd(id),
    );
  }

  relatedServiceLinks() {
    if (!this.page) return [];
    return getRelatedServices(this.page).map((s) => ({
      label: s.navLabel,
      path: `/services/${s.slug}`,
      description: s.targetKeyword,
    }));
  }

  relatedIndustryLinks() {
    return (this.page?.relatedIndustrySlugs ?? [])
      .map((slug) => getIndustryBySlug(slug))
      .filter(Boolean)
      .map((industry) => ({
        label: industry!.name,
        path: `/industries/${industry!.slug}`,
        description: industry!.angle,
      }));
  }

  relatedProjects() {
    return (this.page?.relatedProjectIds ?? [])
      .map((id) => getProjectById(id))
      .filter(Boolean);
  }

  openDiscovery(): void {
    this.discoveryOpen.set(true);
  }
}
