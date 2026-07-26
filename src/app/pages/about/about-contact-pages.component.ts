import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DiscoveryCallDialogComponent } from '../../components/discovery-call-dialog/discovery-call-dialog.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PageCtaComponent } from '../../components/page-cta/page-cta.component';
import { StickyCtaComponent } from '../../components/sticky-cta/sticky-cta.component';
import { buildBreadcrumbJsonLd } from '../../data/schema.helpers';
import { ORGANIZATION, SITE_NAME } from '../../seo/site-seo.config';
import { SeoService } from '../../services/seo.service';
import { CALENDLY_URL } from '../../config/booking.config';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BreadcrumbsComponent, PageCtaComponent, StickyCtaComponent, RouterLink],
  template: `
    <app-header />
    <main class="theme-bg theme-text px-6 py-10 md:px-10 lg:px-14">
      <div class="mx-auto max-w-[800px] pb-24">
        <app-breadcrumbs [items]="[{ label: 'Home', path: '/' }, { label: 'About' }]" />
        <h1 class="font-heading" style="font-size:clamp(2rem,4vw,3rem);font-weight:600;margin:0">About Gbaski AI Services</h1>
        <p class="section-body mt-5">
          We help businesses automate operations, improve customer engagement, and streamline workflows using Artificial Intelligence, with a bias for systems that ship to production.
        </p>
        <p class="section-body mt-4">
          Our team combines AI automation engineering, cloud integrations, and conversational AI across n8n, Make, Zapier, HubSpot,
          GoHighLevel, WhatsApp, voice agents, and custom APIs. We serve Nigeria and Africa, and work remotely with clients in the
          United Kingdom, United States, and worldwide.
        </p>
        <p class="section-body mt-4">
          Differentiator: you can talk to a live AI solutions consultant on our site, then book a discovery call with the people who
          actually build the work.
        </p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1.75rem">
          <a routerLink="/case-studies" class="btn-pill btn-pill--outline">Case studies</a>
          <a routerLink="/services" class="btn-pill btn-pill--primary">Services</a>
        </div>
        <div class="mt-16"><app-page-cta [showCalendly]="false" /></div>
      </div>
    </main>
    <app-footer />
    <app-sticky-cta />
  `,
})
export class AboutPageComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPageMeta({
      title: `About ${SITE_NAME} | AI Automation Agency`,
      description:
        'Gbaski AI Services builds AI workflow automation, agents, CRM integrations, WhatsApp chatbots, and voice agents. Serving Nigeria, the UK, the US, and remote teams worldwide.',
      path: '/about',
    });
    this.seo.setJsonLd('json-ld-breadcrumb', buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]));
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('json-ld-breadcrumb');
  }
}

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    PageCtaComponent,
    StickyCtaComponent,
    DiscoveryCallDialogComponent,
  ],
  template: `
    <app-header />
    <main class="theme-bg theme-text px-6 py-10 md:px-10 lg:px-14">
      <div class="mx-auto max-w-[900px] pb-24">
        <app-breadcrumbs [items]="[{ label: 'Home', path: '/' }, { label: 'Contact' }]" />
        <h1 class="font-heading" style="font-size:clamp(2rem,4vw,3rem);font-weight:600;margin:0">Contact & discovery calls</h1>
        <p class="section-body mt-5">
          Book a discovery call, message us on WhatsApp, or email {{ email }}. International clients typically prefer Calendly;
          local teams often start on WhatsApp.
        </p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1.5rem">
          <a class="btn-pill btn-pill--primary" [href]="calendlyUrl" target="_blank" rel="noopener noreferrer">Open Calendly</a>
          <button type="button" class="btn-pill btn-pill--outline" (click)="discoveryOpen.set(true)">Quick enquiry form</button>
          <a class="btn-pill btn-pill--outline" [href]="whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <div class="mt-12"><app-page-cta title="Pick a time that works" [showCalendly]="true" /></div>
      </div>
    </main>
    <app-footer />
    <app-sticky-cta />
    <app-discovery-call-dialog [open]="discoveryOpen()" (closed)="discoveryOpen.set(false)" />
  `,
})
export class ContactPageComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  readonly discoveryOpen = signal(false);
  readonly email = ORGANIZATION.email;
  readonly whatsapp = ORGANIZATION.contactUrl;
  readonly calendlyUrl = CALENDLY_URL;

  ngOnInit(): void {
    this.seo.setPageMeta({
      title: `Contact ${SITE_NAME} | Book a Discovery Call`,
      description:
        'Schedule a discovery call with Gbaski via Calendly, or reach us on WhatsApp and email. We scope AI automation, CRM, WhatsApp AI, and agent projects.',
      path: '/contact',
    });
    this.seo.setJsonLd('json-ld-breadcrumb', buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]));
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('json-ld-breadcrumb');
  }
}

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  template: `
    <app-header />
    <main class="theme-bg theme-text px-6 py-24 md:px-10 lg:px-14">
      <div class="mx-auto max-w-[700px] text-center pb-24">
        <p class="section-eyebrow mb-4">404</p>
        <h1 class="font-heading" style="font-size:2.4rem;font-weight:600;margin:0">Page not found</h1>
        <p class="section-body mt-5">The page you requested is not available. Try services, case studies, or contact.</p>
        <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap;margin-top:1.75rem">
          <a routerLink="/" class="btn-pill btn-pill--primary">Home</a>
          <a routerLink="/services" class="btn-pill btn-pill--outline">Services</a>
          <a routerLink="/contact" class="btn-pill btn-pill--outline">Contact</a>
        </div>
      </div>
    </main>
    <app-footer />
  `,
})
export class NotFoundPageComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPageMeta({
      title: `Page Not Found | ${SITE_NAME}`,
      description: 'The requested page could not be found on Gbaski AI Services.',
      path: '/404',
    });
  }
}

/** Resources alias hub pointing to blog */
@Component({
  selector: 'app-resources-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BreadcrumbsComponent, RouterLink, StickyCtaComponent],
  template: `
    <app-header />
    <main class="theme-bg theme-text px-6 py-10 md:px-10 lg:px-14">
      <div class="mx-auto max-w-[800px] pb-24">
        <app-breadcrumbs [items]="[{ label: 'Home', path: '/' }, { label: 'Resources' }]" />
        <h1 class="font-heading" style="font-size:clamp(2rem,4vw,3rem);font-weight:600;margin:0">Resources</h1>
        <p class="section-body mt-5">Guides, case studies, and company pages for buyers evaluating AI automation partners.</p>
        <div style="display:grid;gap:0.75rem;margin-top:2rem">
          <a routerLink="/blog" class="theme-card" style="padding:1.1rem;border-radius:1rem;text-decoration:none;border:1px solid var(--theme-border-subtle);color:inherit">Blog & guides</a>
          <a routerLink="/case-studies" class="theme-card" style="padding:1.1rem;border-radius:1rem;text-decoration:none;border:1px solid var(--theme-border-subtle);color:inherit">Case studies</a>
          <a routerLink="/about" class="theme-card" style="padding:1.1rem;border-radius:1rem;text-decoration:none;border:1px solid var(--theme-border-subtle);color:inherit">About</a>
          <a routerLink="/contact" class="theme-card" style="padding:1.1rem;border-radius:1rem;text-decoration:none;border:1px solid var(--theme-border-subtle);color:inherit">Contact</a>
          <a routerLink="/locations" class="theme-card" style="padding:1.1rem;border-radius:1rem;text-decoration:none;border:1px solid var(--theme-border-subtle);color:inherit">Locations</a>
        </div>
      </div>
    </main>
    <app-footer />
    <app-sticky-cta />
  `,
})
export class ResourcesPageComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPageMeta({
      title: `Resources | ${SITE_NAME}`,
      description: 'Blog guides, case studies, about, contact, and location pages from Gbaski AI Services.',
      path: '/resources',
    });
    this.seo.setJsonLd('json-ld-breadcrumb', buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Resources', path: '/resources' },
    ]));
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('json-ld-breadcrumb');
  }
}
