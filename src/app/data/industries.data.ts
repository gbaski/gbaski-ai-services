import type { FaqItem } from './faq.data';

export interface IndustryPage {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  angle: string;
  challenges: string[];
  solutions: string[];
  relatedServiceSlugs: string[];
  faqs: FaqItem[];
}

export const INDUSTRY_PAGES: IndustryPage[] = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    metaTitle: 'AI Automation for Healthcare | WhatsApp & Voice | Gbaski',
    metaDescription:
      'AI automation for healthcare clinics and health brands, WhatsApp triage, appointment booking, and patient support with human escalation.',
    h1: 'AI Automation for Healthcare Teams',
    lead: 'Patient communication and scheduling that stays responsive after hours, without burning out your front desk.',
    angle: 'Patient comms + scheduling',
    challenges: [
      'High volume of repetitive WhatsApp and phone questions',
      'Missed appointment opportunities after hours',
      'Staff time lost hunting policy answers',
    ],
    solutions: [
      'WhatsApp AI for FAQs, triage, and booking',
      'Voice AI for overflow and after-hours calls',
      'Knowledge assistants grounded in approved clinical ops content (non-diagnostic)',
    ],
    relatedServiceSlugs: ['whatsapp-ai-chatbot', 'voice-ai-agent', 'ai-customer-support', 'crm-automation'],
    faqs: [
      {
        question: 'Do you provide medical advice AI?',
        answer:
          'No. We automate administrative and informational workflows using your approved content, with clear escalation to licensed staff.',
      },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    metaTitle: 'AI Automation for Real Estate | Lead Response | Gbaski',
    metaDescription:
      'Speed-to-lead automation for real estate, WhatsApp AI, GoHighLevel/HubSpot workflows, and qualification that responds in minutes.',
    h1: 'AI Automation for Real Estate Teams',
    lead: 'Respond to property enquiries in minutes, qualify buyers and renters, and keep your CRM honest.',
    angle: 'Lead speed-to-lead',
    challenges: [
      'Leads go cold while agents are on site',
      'Fragmented WhatsApp chats with no CRM record',
      'Inconsistent follow-up across the team',
    ],
    solutions: [
      'Instant WhatsApp/web qualification',
      'GHL or HubSpot pipeline automation',
      'Appointment setting and no-show recovery',
    ],
    relatedServiceSlugs: ['gohighlevel-automation', 'whatsapp-ai-chatbot', 'lead-qualification-automation', 'crm-automation'],
    faqs: [
      {
        question: 'Can this work for agencies with many agents?',
        answer: 'Yes. We design routing rules by territory, listing, or round-robin so ownership is clear.',
      },
    ],
  },
  {
    slug: 'finance',
    name: 'Finance',
    metaTitle: 'AI Automation for Finance Teams | Gbaski AI Services',
    metaDescription:
      'AI automation for finance ops, document processing, reporting, CRM workflows, and internal assistants with audit-minded design.',
    h1: 'AI Automation for Finance & Fintech Ops',
    lead: 'Document-heavy and compliance-aware workflows automated with validation and human review where risk is high.',
    angle: 'Ops + compliance-aware automation',
    challenges: ['Manual document handling', 'Reporting rituals', 'Support load on product FAQs'],
    solutions: ['OCR and document pipelines', 'Reporting automation', 'Knowledge assistants for internal ops'],
    relatedServiceSlugs: ['ai-document-processing', 'reporting-dashboard-automation', 'rag-development', 'crm-automation'],
    faqs: [
      {
        question: 'How do you handle sensitive financial data?',
        answer:
          'Least-privilege access, encrypted connections, environment isolation, and clear data-handling agreements scoped per engagement.',
      },
    ],
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    metaTitle: 'AI Automation for Insurance | Claims Intake | Gbaski',
    metaDescription:
      'Insurance automation for FNOL intake, document collection, and customer updates via chatbot, OCR, and workflow orchestration.',
    h1: 'AI Automation for Insurance Operations',
    lead: 'Faster intake and clearer customer updates, with humans approving exceptions.',
    angle: 'Claims intake / FNOL',
    challenges: ['Slow FNOL capture', 'Document chase', 'Status update volume'],
    solutions: ['Intake chatbots', 'OCR document packs', 'Status automation'],
    relatedServiceSlugs: ['ai-chatbots', 'ai-document-processing', 'business-process-automation', 'whatsapp-ai-chatbot'],
    faqs: [
      {
        question: 'Can AI settle claims?',
        answer: 'We automate intake and preparation. Settlement decisions stay with your authorised teams and systems.',
      },
    ],
  },
  {
    slug: 'education',
    name: 'Education',
    metaTitle: 'AI Automation for Education | Admissions Support | Gbaski',
    metaDescription:
      'AI chatbots and knowledge assistants for education, admissions FAQs, student support, and enrolment workflows.',
    h1: 'AI Automation for Education Providers',
    lead: 'Admissions and student support that answers consistently from your prospectus and policies.',
    angle: 'Admissions & student support',
    challenges: ['Repetitive admissions questions', 'After-hours enquiries', 'Scattered programme info'],
    solutions: ['Admissions chatbots', 'Knowledge bases', 'CRM enrolment sync'],
    relatedServiceSlugs: ['ai-chatbots', 'rag-development', 'crm-automation', 'whatsapp-ai-chatbot'],
    faqs: [
      {
        question: 'Do you work with universities and edtech?',
        answer: 'Yes, schools, training providers, and edtech products with high enquiry volume.',
      },
    ],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    metaTitle: 'AI Automation for E-commerce | Shopify & WhatsApp | Gbaski',
    metaDescription:
      'E-commerce AI automation for Shopify support, order status, WhatsApp commerce, and returns triage.',
    h1: 'AI Automation for E-commerce Brands',
    lead: 'Deflect order questions, speed up returns triage, and meet shoppers on WhatsApp.',
    angle: 'Support + order ops',
    challenges: ['Repetitive order status tickets', 'Returns chaos', 'Fragmented channels'],
    solutions: ['Shopify-aware assistants', 'WhatsApp commerce flows', 'Returns workflows'],
    relatedServiceSlugs: ['shopify-automation', 'whatsapp-ai-chatbot', 'ai-customer-support', 'email-sms-automation'],
    faqs: [
      {
        question: 'Do you only support Shopify?',
        answer: 'Shopify is a common stack, but we also integrate other storefronts and order systems via API.',
      },
    ],
  },
  {
    slug: 'recruitment',
    name: 'Recruitment',
    metaTitle: 'AI Automation for Recruitment | Voice Screening | Gbaski',
    metaDescription:
      'Recruitment automation for screening, scheduling, and candidate FAQs, including voice AI and ATS integrations.',
    h1: 'AI Automation for Recruitment Teams',
    lead: 'Screen and schedule faster without losing the human judgment that closes candidates.',
    angle: 'Screening & scheduling',
    challenges: ['High applicant volume', 'Scheduling friction', 'Inconsistent screening notes'],
    solutions: ['Voice screening agents', 'WhatsApp/email FAQs', 'ATS and calendar sync'],
    relatedServiceSlugs: ['voice-ai-agent', 'lead-qualification-automation', 'crm-automation', 'whatsapp-ai-chatbot'],
    faqs: [
      {
        question: 'Will AI replace recruiters?',
        answer: 'No. It removes repetitive screening and scheduling so recruiters focus on relationships and judgment.',
      },
    ],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    metaTitle: 'AI Automation for Manufacturing Ops | Gbaski AI Services',
    metaDescription:
      'Manufacturing ops automation, alerts, reporting, and internal assistants connected to Sheets, Airtable, and plant systems.',
    h1: 'AI Automation for Manufacturing Operations',
    lead: 'Operational alerts and reporting that surface exceptions before they become downtime stories.',
    angle: 'Ops reporting & alerts',
    challenges: ['Manual shift reporting', 'Exception visibility', 'Tribal process knowledge'],
    solutions: ['Reporting automation', 'Alert workflows', 'Internal knowledge assistants'],
    relatedServiceSlugs: ['reporting-dashboard-automation', 'airtable-automation', 'business-process-automation', 'rag-development'],
    faqs: [
      {
        question: 'Can you connect to on-prem systems?',
        answer: 'Often yes via APIs, files, or middleware. We assess connectivity in discovery.',
      },
    ],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    metaTitle: 'AI Automation for Hospitality | Guest Support | Gbaski',
    metaDescription:
      'Hospitality AI for guest WhatsApp support, booking FAQs, and CRM follow-up that keeps your front desk focused on in-person service.',
    h1: 'AI Automation for Hospitality',
    lead: 'Guest messaging and booking questions handled consistently, day and night.',
    angle: 'Bookings & guest support',
    challenges: ['After-hours guest messages', 'Repetitive booking FAQs', 'Upsell follow-up gaps'],
    solutions: ['WhatsApp guest assistants', 'Booking FAQ bots', 'CRM nurture'],
    relatedServiceSlugs: ['whatsapp-ai-chatbot', 'ai-chatbots', 'crm-automation', 'email-sms-automation'],
    faqs: [
      {
        question: 'Can the bot take payments or modify bookings?',
        answer: 'Where your PMS/API allows, yes, with confirmation steps and human override.',
      },
    ],
  },
  {
    slug: 'events',
    name: 'Events',
    metaTitle: 'AI Automation for Events | Registration Support | Gbaski',
    metaDescription:
      'Event automation for registration FAQs, attendee WhatsApp support, and ticketing integrations.',
    h1: 'AI Automation for Event Organisers',
    lead: 'Attendee questions answered at scale, from registration through show day.',
    angle: 'Registration & attendee support',
    challenges: ['Spike in pre-event questions', 'Ticket and agenda confusion', 'Staff overload near show day'],
    solutions: ['Event chatbots', 'Ticketing API integrations', 'Promotions assistants'],
    relatedServiceSlugs: ['ai-chatbots', 'whatsapp-ai-chatbot', 'n8n-developer', 'api-integration'],
    faqs: [
      {
        question: 'Have you built event assistants before?',
        answer: 'Yes, including the Gbaski AI Chat Assistant for organisers and participants.',
      },
    ],
  },
  {
    slug: 'government',
    name: 'Government',
    metaTitle: 'AI Automation for Government Services | Gbaski AI Services',
    metaDescription:
      'Citizen service automation with knowledge assistants and form workflows, designed for clarity, escalation, and auditability.',
    h1: 'AI Automation for Government & Public Services',
    lead: 'Citizen-facing answers from approved content, with clear escalation to human officers.',
    angle: 'Citizen service automation',
    challenges: ['High volume of repetitive enquiries', 'Policy content hard to find', 'Form completion errors'],
    solutions: ['Knowledge assistants', 'Guided form workflows', 'Status update automation'],
    relatedServiceSlugs: ['rag-development', 'ai-chatbots', 'business-process-automation', 'ai-document-processing'],
    faqs: [
      {
        question: 'Do you work with procurement processes?',
        answer: 'We can support discovery and proposals aligned to your procurement requirements.',
      },
    ],
  },
  {
    slug: 'legal',
    name: 'Legal',
    metaTitle: 'AI Automation for Legal Intake | Gbaski AI Services',
    metaDescription:
      'Legal intake and document workflows with AI, matter qualification, document processing, and knowledge assistants for internal playbooks.',
    h1: 'AI Automation for Legal Teams',
    lead: 'Faster intake and less admin, without pretending AI replaces legal judgment.',
    angle: 'Intake & document workflows',
    challenges: ['Noisy intake', 'Document sorting', 'Internal playbook discovery'],
    solutions: ['Intake chatbots', 'OCR pipelines', 'Internal RAG assistants'],
    relatedServiceSlugs: ['ai-chatbots', 'ai-document-processing', 'rag-development', 'crm-automation'],
    faqs: [
      {
        question: 'Is client confidentiality protected?',
        answer:
          'We design for least-privilege access and can deploy into environments that meet your confidentiality requirements.',
      },
    ],
  },
  {
    slug: 'construction',
    name: 'Construction',
    metaTitle: 'AI Automation for Construction | Lead & Project Updates | Gbaski',
    metaDescription:
      'Construction automation for lead follow-up, SMS/WhatsApp project updates, and CRM hygiene across site and office teams.',
    h1: 'AI Automation for Construction Businesses',
    lead: 'Keep leads warm and project stakeholders informed while crews stay on site.',
    angle: 'Lead + project updates',
    challenges: ['Slow lead follow-up', 'Status updates via scattered chats', 'CRM neglect'],
    solutions: ['Lead qualification automation', 'WhatsApp/SMS updates', 'CRM sync'],
    relatedServiceSlugs: ['lead-qualification-automation', 'crm-automation', 'whatsapp-ai-chatbot', 'email-sms-automation'],
    faqs: [
      {
        question: 'Can field teams use this on mobile?',
        answer: 'Yes, WhatsApp and SMS-first designs work well for field-heavy teams.',
      },
    ],
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    metaTitle: 'AI Automation for Logistics | Exception Handling | Gbaski',
    metaDescription:
      'Logistics automation for tracking FAQs, exception handling, and customer updates via chatbot, voice, and API integrations.',
    h1: 'AI Automation for Logistics & Delivery Ops',
    lead: 'Exception handling and customer updates that scale with shipment volume.',
    angle: 'Tracking & exception handling',
    challenges: ['Where is my order volume', 'Exception chaos', 'Agent burnout on status calls'],
    solutions: ['Tracking chatbots', 'Voice status agents', 'API-driven exception workflows'],
    relatedServiceSlugs: ['api-integration', 'ai-chatbots', 'voice-ai-agent', 'whatsapp-ai-chatbot'],
    faqs: [
      {
        question: 'Can you connect to our TMS or courier APIs?',
        answer: 'If there is an API or reliable data feed, yes. We validate connectivity in discovery.',
      },
    ],
  },
];

export function getIndustryBySlug(slug: string): IndustryPage | undefined {
  return INDUSTRY_PAGES.find((page) => page.slug === slug);
}

export const INDUSTRY_HUB = {
  metaTitle: 'Industries We Serve | AI Automation | Gbaski AI Services',
  metaDescription:
    'AI automation solutions for healthcare, real estate, finance, e-commerce, recruitment, logistics, and more, WhatsApp, CRM, voice, and workflow systems.',
  h1: 'Industries We Serve',
  lead: 'Vertical playbooks built on the same production stack: workflow automation, CRM, WhatsApp AI, voice agents, and knowledge systems.',
};
