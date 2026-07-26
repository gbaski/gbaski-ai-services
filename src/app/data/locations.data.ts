export interface LocationPage {
  slug: string;
  name: string;
  regionLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  body: string[];
  serviceFocus: string[];
  relatedServiceSlugs: string[];
}

export const LOCATION_PAGES: LocationPage[] = [
  {
    slug: 'nigeria',
    name: 'Nigeria',
    regionLabel: 'Africa',
    metaTitle: 'AI Automation Agency in Nigeria | Gbaski AI Services',
    metaDescription:
      'AI automation agency in Nigeria, WhatsApp AI, n8n, CRM automation, chatbots, and voice agents for Lagos, Abuja, and nationwide businesses.',
    h1: 'AI Automation Agency in Nigeria',
    lead:
      'Production AI systems for Nigerian businesses that live on WhatsApp, run lean ops teams, and need reliable automation, not slideware.',
    body: [
      'Gbaski AI Services designs and ships AI workflow automation, chatbots, voice agents, and CRM integrations for companies across Nigeria.',
      'We combine local channel reality (WhatsApp-first customer communication) with global engineering practice (AWS, n8n, secure APIs).',
      'Whether you are in Lagos, Abuja, Port Harcourt, Ibadan, or operating nationally, we scope around your stack and ship to production.',
    ],
    serviceFocus: ['WhatsApp AI chatbots', 'n8n automation', 'CRM & lead qualification', 'Voice AI agents'],
    relatedServiceSlugs: ['whatsapp-ai-chatbot', 'n8n-developer', 'crm-automation', 'ai-workflow-automation'],
  },
  {
    slug: 'lagos',
    name: 'Lagos',
    regionLabel: 'Nigeria',
    metaTitle: 'AI Automation Company in Lagos | Gbaski AI Services',
    metaDescription:
      'Hire an AI automation company in Lagos for WhatsApp chatbots, n8n workflows, HubSpot/GHL CRM automation, and custom AI agents.',
    h1: 'AI Automation Company in Lagos',
    lead: 'Lagos-paced businesses need speed-to-lead and support systems that keep up. We build them.',
    body: [
      'From fintech and e-commerce to real estate and events, Lagos teams need automation that survives real message volume.',
      'We deliver WhatsApp AI, CRM workflows, and backend integrations with clear ownership and documentation.',
    ],
    serviceFocus: ['WhatsApp AI', 'CRM automation', 'E-commerce support AI', 'API integrations'],
    relatedServiceSlugs: ['whatsapp-ai-chatbot', 'crm-automation', 'shopify-automation', 'api-integration'],
  },
  {
    slug: 'abuja',
    name: 'Abuja',
    regionLabel: 'Nigeria',
    metaTitle: 'AI Services in Abuja | Automation & Chatbots | Gbaski',
    metaDescription:
      'AI services in Abuja for government-adjacent teams, professional services, and growing companies, chatbots, knowledge assistants, and workflow automation.',
    h1: 'AI Services in Abuja',
    lead: 'Knowledge assistants and workflow automation for Abuja organisations that need clarity, auditability, and reliable delivery.',
    body: [
      'We help Abuja teams automate citizen or client enquiries, internal knowledge access, and operational workflows.',
      'Engagements emphasise documentation, access control, and human escalation paths.',
    ],
    serviceFocus: ['Knowledge assistants', 'Process automation', 'Chatbots', 'Document AI'],
    relatedServiceSlugs: ['rag-development', 'business-process-automation', 'ai-chatbots', 'ai-document-processing'],
  },
  {
    slug: 'united-kingdom',
    name: 'United Kingdom',
    regionLabel: 'Europe',
    metaTitle: 'Remote AI Automation Agency for UK Teams | Gbaski',
    metaDescription:
      'Remote AI automation partner for UK companies, HubSpot, Salesforce, n8n, chatbots, and voice agents with production engineering standards.',
    h1: 'AI Automation for UK Teams (Remote)',
    lead: 'A remote production team for UK operators who want specialist AI automation without enterprise staffing overhead.',
    body: [
      'We work asynchronously with UK time zones overlapping, with discovery calls scheduled to suit your team.',
      'Typical work includes HubSpot/Salesforce automation, n8n workflows, support AI, and RAG assistants.',
      'You get documented systems you own, not lock-in to opaque freelancers.',
    ],
    serviceFocus: ['HubSpot & Salesforce automation', 'n8n / Make', 'Support AI', 'RAG assistants'],
    relatedServiceSlugs: ['hubspot-automation', 'salesforce-automation', 'n8n-developer', 'rag-development'],
  },
  {
    slug: 'united-states',
    name: 'United States',
    regionLabel: 'North America',
    metaTitle: 'Remote AI Automation Agency for US Companies | Gbaski',
    metaDescription:
      'Remote AI automation for US companies, GoHighLevel, HubSpot, Zapier/n8n, WhatsApp/SMS, and voice AI agents built for production.',
    h1: 'AI Automation for US Companies (Remote)',
    lead: 'Hire a specialist automation team that ships CRM, messaging, and AI agent systems, without marketplace roulette.',
    body: [
      'US clients typically engage us for GoHighLevel or HubSpot automation, lead qualification, voice AI, and n8n at scale.',
      'We communicate in clear milestones, estimate upfront, and transfer ownership of workflows and repos to your accounts.',
    ],
    serviceFocus: ['GoHighLevel automation', 'Lead qualification', 'Voice AI', 'n8n development'],
    relatedServiceSlugs: ['gohighlevel-automation', 'lead-qualification-automation', 'voice-ai-agent', 'n8n-developer'],
  },
];

export function getLocationBySlug(slug: string): LocationPage | undefined {
  return LOCATION_PAGES.find((page) => page.slug === slug);
}

export const LOCATION_HUB = {
  metaTitle: 'Locations | Nigeria, UK, US & Remote Worldwide | Gbaski AI Services',
  metaDescription:
    'Gbaski AI Services serves Nigeria (Lagos, Abuja), the United Kingdom, the United States, and remote clients worldwide with AI automation and integrations.',
  h1: 'Where We Work',
  lead: 'Local expertise for Nigeria and Africa, remote delivery for UK and US teams, and a single production standard everywhere.',
};
