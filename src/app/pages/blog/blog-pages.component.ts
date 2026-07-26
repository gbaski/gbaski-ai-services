import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PageCtaComponent } from '../../components/page-cta/page-cta.component';
import { RelatedPagesComponent } from '../../components/related-pages/related-pages.component';
import { StickyCtaComponent } from '../../components/sticky-cta/sticky-cta.component';
import { BLOG_HUB, BLOG_POSTS, BlogPost, getPostBySlug } from '../../data/blog.data';
import { getServiceBySlug } from '../../data/services.data';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '../../data/schema.helpers';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-hub',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BreadcrumbsComponent, PageCtaComponent, StickyCtaComponent, RouterLink],
  template: `
    <app-header />
    <main class="theme-bg theme-text px-6 py-10 md:px-10 lg:px-14">
      <div class="mx-auto max-w-[1400px] pb-24">
        <app-breadcrumbs [items]="[{ label: 'Home', path: '/' }, { label: 'Blog' }]" />
        <h1 class="font-heading" style="font-size:clamp(2rem,4vw,3rem);font-weight:600;margin:0">{{ hub.h1 }}</h1>
        <p class="section-body mt-5 max-w-3xl">{{ hub.lead }}</p>
        <div style="display:grid;gap:0.85rem;margin-top:3rem">
          @for (post of posts; track post.slug) {
            <a [routerLink]="['/blog', post.slug]" class="theme-card"
              style="display:grid;gap:0.35rem;padding:1.15rem 1.25rem;border-radius:1rem;text-decoration:none;border:1px solid var(--theme-border-subtle);color:inherit">
              <span class="font-mono-label" style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--theme-text-secondary)">
                {{ post.category }} · {{ post.readMinutes }} min · {{ post.datePublished }}
              </span>
              <span class="font-heading" style="font-weight:600;font-size:1.1rem">{{ post.title }}</span>
              <span class="theme-text-muted">{{ post.excerpt }}</span>
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
export class BlogHubComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  readonly hub = BLOG_HUB;
  readonly posts = BLOG_POSTS;

  ngOnInit(): void {
    this.seo.setPageMeta({ title: this.hub.metaTitle, description: this.hub.metaDescription, path: '/blog' });
    this.seo.setJsonLd('json-ld-breadcrumb', buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]));
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('json-ld-breadcrumb');
  }
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    PageCtaComponent,
    RelatedPagesComponent,
    StickyCtaComponent,
    RouterLink,
  ],
  template: `
    @if (post; as p) {
      <app-header />
      <main class="theme-bg theme-text px-6 py-10 md:px-10 lg:px-14">
        <article class="mx-auto max-w-[800px] pb-24">
          <app-breadcrumbs [items]="[
            { label: 'Home', path: '/' },
            { label: 'Blog', path: '/blog' },
            { label: p.title }
          ]" />
          <p class="font-mono-label" style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--theme-text-secondary)">
            {{ p.category }} · {{ p.datePublished }} · {{ p.readMinutes }} min read
          </p>
          <h1 class="font-heading" style="font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:600;letter-spacing:-0.03em;margin:1rem 0 0;line-height:1.15">
            {{ p.title }}
          </h1>
          <p class="section-body mt-5">{{ p.excerpt }}</p>
          <div class="blog-body theme-text-soft" style="margin-top:2rem;line-height:1.75;white-space:pre-wrap" [innerText]="p.body"></div>
          <div class="mt-14"><app-page-cta [showCalendly]="false" /></div>
          <div class="mt-12">
            <app-related-pages heading="Related services" [links]="serviceLinks()" />
          </div>
          <p class="mt-10"><a routerLink="/blog" class="font-mono-label" style="color:var(--theme-text-secondary);text-decoration:none">← All articles</a></p>
        </article>
      </main>
      <app-footer />
      <app-sticky-cta />
    }
  `,
})
export class BlogPostComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);
  post?: BlogPost;

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const post = getPostBySlug(params.get('slug') ?? '');
      if (!post) {
        void this.router.navigateByUrl('/404');
        return;
      }
      this.post = post;
      const path = `/blog/${post.slug}`;
      this.seo.setPageMeta({
        title: post.metaTitle,
        description: post.metaDescription,
        path,
      });
      this.seo.setJsonLd('json-ld-breadcrumb', buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path },
      ]));
      this.seo.setJsonLd('json-ld-article', buildArticleJsonLd({
        title: post.title,
        description: post.metaDescription,
        path,
        datePublished: post.datePublished,
      }));
    });
  }

  ngOnDestroy(): void {
    ['json-ld-breadcrumb', 'json-ld-article'].forEach((id) => this.seo.removeJsonLd(id));
  }

  serviceLinks() {
    return (this.post?.relatedServiceSlugs ?? [])
      .map((slug) => getServiceBySlug(slug))
      .filter(Boolean)
      .map((s) => ({ label: s!.name, path: `/services/${s!.slug}` }));
  }
}
