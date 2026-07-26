import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  OG_IMAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from '../seo/site-seo.config';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  setHomePageSeo(): void {
    this.setPageMeta({
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      keywords: DEFAULT_KEYWORDS,
      path: '/',
    });
  }

  setPageMeta(options: {
    title: string;
    description: string;
    keywords?: string;
    path?: string;
    image?: string;
    imageAlt?: string;
  }): void {
    const url = options.path ? `${SITE_URL}${options.path}` : SITE_URL;
    const image = options.image ?? OG_IMAGE;
    const imageAlt = options.imageAlt ?? `${SITE_NAME} — AI services in Nigeria: automation, chatbots, and agents`;

    this.title.setTitle(options.title);

    this.meta.updateTag({ name: 'description', content: options.description });
    this.meta.updateTag({ name: 'keywords', content: options.keywords ?? DEFAULT_KEYWORDS });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    this.meta.updateTag({ name: 'author', content: SITE_NAME });
    this.meta.updateTag({ name: 'geo.region', content: 'NG' });
    this.meta.updateTag({ name: 'geo.placename', content: 'Nigeria' });
    this.meta.updateTag({ name: 'language', content: SITE_LOCALE });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:title', content: options.title });
    this.meta.updateTag({ property: 'og:description', content: options.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: imageAlt });
    this.meta.updateTag({ property: 'og:locale', content: 'en_NG' });
    this.meta.updateTag({ property: 'og:locale:alternate', content: 'en_US' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: options.title });
    this.meta.updateTag({ name: 'twitter:description', content: options.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:image:alt', content: imageAlt });

    this.setCanonical(url);
  }

  setJsonLd(scriptId: string, data: Record<string, unknown>): void {
    const head = this.document.head;
    let script = head.querySelector<HTMLScriptElement>(`script#${scriptId}`);

    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }

  removeJsonLd(scriptId: string): void {
    this.document.head.querySelector(`script#${scriptId}`)?.remove();
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
