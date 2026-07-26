import { SITE_NAME, SITE_URL, ORGANIZATION } from '../seo/site-seo.config';
import type { FaqItem } from './faq.data';

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildFaqJsonLd(faqs: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceJsonLd(options: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    url: `${SITE_URL}${options.path}`,
    serviceType: options.serviceType ?? options.name,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      telephone: ORGANIZATION.telephone,
      email: ORGANIZATION.email,
    },
    areaServed: [
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
  };
}

export function buildHowToJsonLd(options: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: options.name,
    description: options.description,
    step: options.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function buildArticleJsonLd(options: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    url: `${SITE_URL}${options.path}`,
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    author: {
      '@type': 'Person',
      name: options.authorName ?? 'Gbaski AI Services',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: ORGANIZATION.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${options.path}`,
    },
  };
}

export function buildSpeakableJsonLd(path: string, cssSelectors: string[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${SITE_URL}${path}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}
