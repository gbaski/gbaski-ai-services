import {
  ADDITIONAL_SERVICE_STATES,
  PRIMARY_SERVICE_CITIES,
  SERVICE_AREAS_DISPLAY,
} from './location-seo.config';
import { AUTOMATION_PLATFORMS_SEO, INTEGRATION_PLATFORMS_SEO_LINE } from './integrations-seo.config';

export { INTEGRATION_PLATFORMS_SEO_LINE, AUTOMATION_PLATFORMS_SEO };

export const SITE_URL = 'https://ai-services.com.ng';
export const SITE_NAME = 'Gbaski AI Services';
export const SITE_LOCALE = 'en-NG';
export const ORGANIZATION_FOUNDING_DATE = '2024';

export const DEFAULT_TITLE =
  'AI Services in Nigeria | Automation, Chatbots & Agents | Gbaski AI Services';

export const DEFAULT_DESCRIPTION =
  'Gbaski AI Services delivers AI services in Nigeria — automation, chatbots, voice agents, and custom integrations built for production. Talk to our AI consultant and see our projects.';

export { SERVICE_AREAS_DISPLAY, PRIMARY_SERVICE_CITIES, ADDITIONAL_SERVICE_STATES };

/** Curated keywords for static meta tags (non-SSR crawlers read index.html). */
export const STATIC_META_KEYWORDS = [
  'AI services in Nigeria',
  'AI services Nigeria',
  'AI automation Nigeria',
  'chatbot development Nigeria',
  'AI agents Nigeria',
  'workflow automation',
  'WhatsApp chatbot',
  'n8n automation',
].join(', ');

export const DEFAULT_KEYWORDS = STATIC_META_KEYWORDS;

export const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Primary contact email; planned migration to PLANNED_EMAIL when ready */
export const ORGANIZATION_EMAIL = 'hello@gbaski.app';
export const ORGANIZATION_EMAIL_PLANNED = 'aiservices@gbaski.app';

export const ORGANIZATION_SAME_AS = [
  'https://gbaski.app',
  'https://wa.me/2348034309999',
] as const;

export const ORGANIZATION = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/gbaski-logo.svg`,
  email: ORGANIZATION_EMAIL,
  emailPlanned: ORGANIZATION_EMAIL_PLANNED,
  telephone: '+2348034309999',
  contactUrl: 'https://wa.me/2348034309999',
  foundingDate: ORGANIZATION_FOUNDING_DATE,
  sameAs: [...ORGANIZATION_SAME_AS],
  areaServed: 'Nigeria',
  description: DEFAULT_DESCRIPTION,
};

export const SERVICE_CATEGORY = 'Artificial Intelligence Services';

export const AI_SERVICE_OFFERINGS = [
  {
    name: 'AI Automation',
    description:
      'Intelligent workflow automation for Nigerian businesses, with triggers, routing, and decision logic tailored to local operations.',
  },
  {
    name: 'Chatbot Integration',
    description:
      'Conversational AI across web, WhatsApp, and support channels with unified context for customers in Nigeria.',
  },
  {
    name: 'Voice Customer Assistant',
    description:
      'Natural voice AI for support, sales, and onboarding with human-like conversational flows.',
  },
  {
    name: 'Custom AI Agents',
    description:
      'Purpose-built AI agents with custom tools, memory, and guardrails aligned to your business goals.',
  },
  {
    name: 'Process Automation',
    description:
      'End-to-end operations orchestration with n8n, Make, Zapier, and connections across CRM, databases, and internal platforms.',
  },
  {
    name: 'CRM Integration',
    description:
      'Connect AI into your CRM and business tools to enrich records, automate follow-ups, and sync customer intelligence.',
  },
  {
    name: 'Workflow Integrations',
    description:
      'Integrate AI with n8n, Make, Zapier, Slack, YouTube, WhatsApp, AWS, Google, TikTok, Shopify, and other platforms your team relies on.',
  },
];
