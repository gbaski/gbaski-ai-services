import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SITE_URL = 'https://ai-services.com.ng';
const GA_MEASUREMENT_ID = 'G-9M315LZ644';
const SITE_NAME = 'Gbaski AI Services';
const TITLE = 'AI Services in Nigeria | Automation, Chatbots & Agents | Gbaski AI Services';
const DESC =
  'Gbaski AI Services delivers AI services in Nigeria — automation, chatbots, voice agents, and custom integrations built for production. Talk to our AI consultant and see our projects.';
const OG_DESC = DESC;
const KEYWORDS =
  'AI services in Nigeria, AI services Nigeria, AI automation Nigeria, chatbot development Nigeria, AI agents Nigeria, workflow automation, WhatsApp chatbot, n8n automation';
const FOUNDING_DATE = '2024';
const SAME_AS = ['https://gbaski.app', 'https://wa.me/2348034309999'];
const SERVICE_CATEGORY = 'Artificial Intelligence Services';
const OG = `${SITE_URL}/og-image.png`;

const areaServed = [
  {
    '@type': 'City',
    name: 'Lagos',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Lagos State',
      containedInPlace: { '@type': 'Country', name: 'Nigeria' },
    },
  },
  {
    '@type': 'City',
    name: 'Abuja',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Federal Capital Territory',
      containedInPlace: { '@type': 'Country', name: 'Nigeria' },
    },
  },
  { '@type': 'Country', name: 'Nigeria' },
];

const services = [
  [
    'AI Automation',
    'Intelligent workflow automation for Nigerian businesses, with triggers, routing, and decision logic tailored to local operations.',
  ],
  [
    'Chatbot Integration',
    'Conversational AI across web, WhatsApp, and support channels with unified context for customers in Nigeria.',
  ],
  [
    'Voice Customer Assistant',
    'Natural voice AI for support, sales, and onboarding with human-like conversational flows.',
  ],
  [
    'Custom AI Agents',
    'Purpose-built AI agents with custom tools, memory, and guardrails aligned to your business goals.',
  ],
  [
    'Process Automation',
    'End-to-end operations orchestration with n8n, Make, Zapier, and connections across CRM, databases, and internal platforms.',
  ],
  [
    'CRM Integration',
    'Connect AI into your CRM and business tools to enrich records, automate follow-ups, and sync customer intelligence.',
  ],
  [
    'Workflow Integrations',
    'Integrate AI with n8n, Make, Zapier, Slack, YouTube, WhatsApp, AWS, Google, TikTok, Shopify, and other platforms your team relies on.',
  ],
];

const platforms = [
  ['n8n', 'Workflow automation and AI orchestration with n8n.'],
  ['Zapier', 'Connect apps and automate tasks with Zapier integrations.'],
  ['Make', 'Visual workflow automation and AI integrations with Make.'],
  ['Slack', 'Slack notifications, bots, and team workflow integrations.'],
  ['YouTube', 'YouTube content, publishing, and audience workflow integrations.'],
  ['WhatsApp', 'WhatsApp Business messaging and chatbot integrations.'],
  ['AWS', 'AWS cloud infrastructure for AI and automation workloads.'],
  ['Google', 'Google Workspace, APIs, and cloud service integrations.'],
  ['TikTok', 'TikTok content, publishing, and social workflow integrations.'],
  ['Shopify', 'Shopify e-commerce and customer experience integrations.'],
];

const faqs = [
  [
    'Do you provide AI services in Nigeria?',
    'Yes. Gbaski AI Services provides AI services in Nigeria for businesses nationwide — from Lagos and Abuja to Port Harcourt, Ibadan, and beyond. We deliver automation, chatbots, voice assistants, and custom AI agents built for production.',
  ],
  [
    'What AI services do you offer?',
    'We build workflow automation, AI-powered customer support assistants, voice agents, internal knowledge assistants, and CRM or business-system integrations, designed for production, not demos.',
  ],
  [
    'How much does an AI automation project cost?',
    'Scoped projects often start from a few thousand dollars for focused automations, with larger builds priced after discovery. We provide clear estimates upfront based on workflows, integrations, and delivery timeline.',
  ],
  [
    'How long does implementation take?',
    'Timelines depend on scope and complexity. Most focused AI deployments are completed within four to eight weeks; larger multi-system rollouts are phased with milestones you can track.',
  ],
  [
    'How do we get started with AI?',
    'We begin with a discovery session to understand your objectives, workflows, and infrastructure. From there, we propose a roadmap with clear deliverables and measurable outcomes.',
  ],
  [
    'Can you integrate with our existing software stack?',
    'Yes. We connect AI and automation to CRMs, databases, messaging platforms, cloud services, and internal APIs, including n8n, Make, Zapier, WhatsApp, AWS, and the tools your team already uses.',
  ],
  [
    'Do you build custom systems or use templates?',
    'Both, with intent. We use proven patterns where they fit, then design custom workflows, agents, and integrations around your processes, data, and business rules, not one-size-fits-all templates for core logic.',
  ],
  [
    'Who owns the AI workflows and data?',
    'You do. Workflows, configurations, prompts, and customer data remain your property. We document handoff clearly and can transfer n8n instances, repositories, and cloud resources to your accounts.',
  ],
  [
    'How secure are your AI integrations?',
    'Security is built in from the start. We use least-privilege access, encrypted connections, environment isolation, and secure handling of API keys and customer data, aligned with production best practices.',
  ],
  [
    'Do you offer ongoing support and maintenance?',
    'Yes. We offer post-launch support, monitoring, workflow updates, and iterative improvements so your automations stay reliable as your business and tools change.',
  ],
  [
    'Who do you work with?',
    'We partner with startups, SMEs, and enterprises in Nigeria and worldwide, across technology, finance, retail, health, and operations-focused teams that need AI shipped to production.',
  ],
];

const knowsAbout = [
  'Artificial Intelligence',
  'AI services in Nigeria',
  'AI automation',
  'Chatbot integration',
  'Custom AI agents',
  'Voice AI',
  'Business process automation',
  'Workflow integrations',
  ...platforms.map((p) => p[0]),
];

const jsonLdBlocks = [
  [
    'organization',
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/gbaski-logo.svg`,
      description: DESC,
      foundingDate: FOUNDING_DATE,
      sameAs: SAME_AS,
      email: 'hello@gbaski.app',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@gbaski.app',
        telephone: '+2348034309999',
        contactType: 'customer service',
        areaServed: 'NG',
        availableLanguage: ['English'],
        url: 'https://wa.me/2348034309999',
      },
      areaServed,
      knowsAbout,
    },
  ],
  [
    'website',
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DESC,
      inLanguage: 'en-NG',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
  ],
  [
    'webpage',
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      name: TITLE,
      url: `${SITE_URL}/`,
      description: DESC,
      inLanguage: 'en-NG',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
  ],
  [
    'professional-service',
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: SITE_NAME,
      url: SITE_URL,
      description: DESC,
      image: OG,
      areaServed,
      serviceType: 'AI Services',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Services in Nigeria',
        itemListElement: services.map(([name, description], index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name,
            description,
            category: SERVICE_CATEGORY,
            areaServed,
            provider: { '@type': 'Organization', name: SITE_NAME },
          },
        })),
      },
    },
  ],
  [
    'faq',
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    },
  ],
  [
    'services',
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'AI Services offered in Nigeria',
      itemListElement: services.map(([name, description], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name,
          description,
          category: SERVICE_CATEGORY,
          provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          areaServed,
        },
      })),
    },
  ],
  [
    'integrations',
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'AI integration platforms',
      description:
        'Tools and platforms Gbaski AI Services integrates with for automation and AI workflows.',
      itemListElement: platforms.map(([name, description], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: `${name} integration`,
          serviceType: `${name} AI integration`,
          description,
          provider: { '@type': 'Organization', name: SITE_NAME },
        },
      })),
    },
  ],
];

const jsonLdScripts = jsonLdBlocks
  .map(
    ([id, data]) =>
      `  <script id="json-ld-${id}" type="application/ld+json">${JSON.stringify(data)}</script>`,
  )
  .join('\n');

const html = `<!doctype html>
<html lang="en-NG" data-theme="dark">
<head>
  <meta charset="utf-8">
  <script>
    (function () {
      try {
        if (localStorage.getItem('gbaski-theme') === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      } catch (e) {}
    })();
  </script>
  <style>
    html { color-scheme: dark; background: #0b0e13; }
    body { margin: 0; background: #0b0e13; color: #e7ebf2; }
    html[data-theme="light"] { color-scheme: light; background: #f3f5f8; }
    html[data-theme="light"] body { background: #f3f5f8; color: #12161e; }
  </style>
  <title>${TITLE}</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${DESC}">
  <meta name="keywords" content="${KEYWORDS}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="author" content="${SITE_NAME}">
  <meta name="geo.region" content="NG">
  <meta name="geo.placename" content="Nigeria">
  <meta name="language" content="en-NG">
  <link rel="canonical" href="${SITE_URL}/">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <link rel="preload" as="image" href="/gbaski-logo.svg">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="apple-touch-icon" href="/gbaski-logo.svg">
  <meta name="theme-color" content="#0b0e13">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:title" content="${TITLE}">
  <meta property="og:description" content="${OG_DESC}">
  <meta property="og:url" content="${SITE_URL}/">
  <meta property="og:image" content="${OG}">
  <meta property="og:locale" content="en_NG">
  <meta property="og:locale:alternate" content="en_US">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${TITLE}">
  <meta name="twitter:description" content="${OG_DESC}">
  <meta name="twitter:image" content="${OG}">
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${GA_MEASUREMENT_ID}');
  </script>
${jsonLdScripts}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Lora:wght@400;500;600;700&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
</body>
</html>
`;

fs.writeFileSync(path.join(root, 'src', 'index.html'), html);
console.log('Generated src/index.html with static SEO meta and JSON-LD');
