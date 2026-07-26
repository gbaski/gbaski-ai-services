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
import { ALL_PROJECTS, CASE_STUDIES_HUB, Project, getProjectById } from '../../data/projects.data';
import { getServiceBySlug } from '../../data/services.data';
import { buildBreadcrumbJsonLd } from '../../data/schema.helpers';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-case-studies-hub',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BreadcrumbsComponent, PageCtaComponent, StickyCtaComponent, RouterLink],
  template: `
    <app-header />
    <main class="theme-bg theme-text px-6 py-10 md:px-10 lg:px-14">
      <div class="mx-auto max-w-[1200px] pb-24">
        <app-breadcrumbs [items]="[{ label: 'Home', path: '/' }, { label: 'Case Studies' }]" />
        <h1 class="font-heading" style="font-size:clamp(2rem,4vw,3rem);font-weight:600;margin:0">{{ hub.h1 }}</h1>
        <p class="section-body mt-5 max-w-3xl">{{ hub.lead }}</p>
        <div style="display:grid;gap:1rem;margin-top:3rem">
          @for (project of projects; track project.id) {
            <a [routerLink]="['/case-studies', project.id]" class="theme-card"
              style="display:grid;gap:0.45rem;padding:1.25rem;border-radius:1rem;text-decoration:none;border:1px solid var(--theme-border-subtle);color:inherit">
              <span class="font-mono-label" style="font-size:0.8125rem;letter-spacing:0;text-transform:none;color:var(--theme-muted-soft)">{{ project.clientName }}</span>
              <span class="font-heading" style="font-weight:600;font-size:1.2rem">{{ project.title }}</span>
              <span class="theme-text-muted">{{ project.outcomeSummary || project.description.split('\\n')[0] }}</span>
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
export class CaseStudiesHubComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  readonly hub = CASE_STUDIES_HUB;
  readonly projects = ALL_PROJECTS;

  ngOnInit(): void {
    this.seo.setPageMeta({ title: this.hub.metaTitle, description: this.hub.metaDescription, path: '/case-studies' });
    this.seo.setJsonLd('json-ld-breadcrumb', buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Case Studies', path: '/case-studies' },
    ]));
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('json-ld-breadcrumb');
  }
}

@Component({
  selector: 'app-case-study-page',
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
    @if (project; as p) {
      <app-header />
      <main class="theme-bg theme-text px-6 py-10 md:px-10 lg:px-14">
        <div class="mx-auto max-w-[900px] pb-24">
          <app-breadcrumbs [items]="[
            { label: 'Home', path: '/' },
            { label: 'Case Studies', path: '/case-studies' },
            { label: p.clientName }
          ]" />
          <p class="section-eyebrow mb-4">{{ p.clientName }}</p>
          <h1 class="font-heading" style="font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:600;margin:0;letter-spacing:-0.03em">{{ p.title }}</h1>
          @if (p.outcomeSummary) {
            <p class="section-body mt-5">{{ p.outcomeSummary }}</p>
          }
          @if (p.metrics?.length) {
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:0.75rem;margin-top:1.75rem">
              @for (metric of p.metrics; track metric.label) {
                <div class="theme-card" style="padding:1rem;border-radius:1rem;border:1px solid var(--theme-border-subtle)">
                  <p class="font-mono-label" style="margin:0 0 0.35rem;font-size:0.8125rem;letter-spacing:0;text-transform:none;color:var(--theme-muted-soft)">{{ metric.label }}</p>
                  <p class="font-heading" style="margin:0;font-weight:600">{{ metric.value }}</p>
                </div>
              }
            </div>
          }
          <div class="theme-text-soft" style="margin-top:2rem;white-space:pre-wrap;line-height:1.75">{{ p.description }}</div>
          @if (p.images.length) {
            <div style="display:grid;gap:1rem;margin-top:2rem">
              @for (image of p.images; track image.src) {
                <img [src]="image.src" [alt]="image.alt" style="width:100%;border-radius:1rem;border:1px solid var(--theme-border-subtle)" loading="lazy" />
              }
            </div>
          }
          <p class="mt-8">
            <a [href]="p.productionUrl" target="_blank" rel="noopener noreferrer" class="btn-pill btn-pill--outline">View live project</a>
          </p>
          <div class="mt-16"><app-page-cta (book)="discoveryOpen.set(true)" /></div>
          @if (serviceLinks().length) {
            <div class="mt-12"><app-related-pages heading="Services used" [links]="serviceLinks()" /></div>
          }
        </div>
      </main>
      <app-footer />
      <app-sticky-cta (book)="discoveryOpen.set(true)" />
      <app-discovery-call-dialog [open]="discoveryOpen()" (closed)="discoveryOpen.set(false)" />
    }
  `,
})
export class CaseStudyPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);
  project?: Project;
  readonly discoveryOpen = signal(false);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const project = getProjectById(params.get('slug') ?? '');
      if (!project) {
        void this.router.navigateByUrl('/404');
        return;
      }
      this.project = project;
      const path = `/case-studies/${project.id}`;
      this.seo.setPageMeta({
        title: project.metaTitle ?? `${project.title} | Gbaski AI Services`,
        description: project.metaDescription ?? project.outcomeSummary ?? project.description.slice(0, 155),
        path,
        image: project.images[0] ? `https://ai-services.com.ng${project.images[0].src}` : undefined,
      });
      this.seo.setJsonLd('json-ld-breadcrumb', buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: project.title, path },
      ]));
    });
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('json-ld-breadcrumb');
  }

  serviceLinks() {
    return (this.project?.relatedServiceSlugs ?? [])
      .map((slug) => getServiceBySlug(slug))
      .filter(Boolean)
      .map((s) => ({ label: s!.name, path: `/services/${s!.slug}` }));
  }
}
