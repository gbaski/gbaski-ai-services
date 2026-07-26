export interface IntegrationPlatform {
  name: string;
  slug: string;
  description: string;
}

/** Platforms referenced in SEO copy, keywords, and structured data */
export const INTEGRATION_PLATFORMS: IntegrationPlatform[] = [
  {
    name: 'n8n',
    slug: 'n8n',
    description: 'Workflow automation and AI orchestration with n8n.',
  },
  {
    name: 'Zapier',
    slug: 'zapier',
    description: 'Connect apps and automate tasks with Zapier integrations.',
  },
  {
    name: 'Make',
    slug: 'make',
    description: 'Visual workflow automation and AI integrations with Make.',
  },
  {
    name: 'Slack',
    slug: 'slack',
    description: 'Slack notifications, bots, and team workflow integrations.',
  },
  {
    name: 'YouTube',
    slug: 'youtube',
    description: 'YouTube content, publishing, and audience workflow integrations.',
  },
  {
    name: 'WhatsApp',
    slug: 'whatsapp',
    description: 'WhatsApp Business messaging and chatbot integrations.',
  },
  {
    name: 'AWS',
    slug: 'aws',
    description: 'AWS cloud infrastructure for AI and automation workloads.',
  },
  {
    name: 'Google',
    slug: 'google',
    description: 'Google Workspace, APIs, and cloud service integrations.',
  },
  {
    name: 'TikTok',
    slug: 'tiktok',
    description: 'TikTok content, publishing, and social workflow integrations.',
  },
  {
    name: 'Shopify',
    slug: 'shopify',
    description: 'Shopify e-commerce and customer experience integrations.',
  },
];

export const INTEGRATION_PLATFORM_NAMES = INTEGRATION_PLATFORMS.map((p) => p.name);

export const AUTOMATION_PLATFORMS_SEO = 'n8n, Make, and Zapier';

export const INTEGRATION_PLATFORMS_SEO_LINE =
  'n8n, Make, Zapier, Slack, YouTube, WhatsApp, AWS, Google, TikTok, Shopify, and more';

export function buildIntegrationMetaKeywords(): string[] {
  const keywords: string[] = [];

  for (const platform of INTEGRATION_PLATFORMS) {
    keywords.push(`${platform.name} integration`);
    keywords.push(`${platform.name} AI integration`);
    keywords.push(`${platform.name} automation Nigeria`);
    keywords.push(`AI ${platform.name} integration Nigeria`);
  }

  keywords.push('workflow automation Nigeria');
  keywords.push('no-code automation Nigeria');
  keywords.push('AI tool integrations Nigeria');

  return keywords;
}

export function buildIntegrationSchemaList(
  providerName = 'Gbaski AI Services',
): Array<Record<string, unknown>> {
  return INTEGRATION_PLATFORMS.map((platform, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: `${platform.name} integration`,
      serviceType: `${platform.name} AI integration`,
      description: platform.description,
      provider: {
        '@type': 'Organization',
        name: providerName,
      },
    },
  }));
}
