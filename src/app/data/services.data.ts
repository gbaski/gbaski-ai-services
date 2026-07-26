import type { FaqItem } from './faq.data';

export interface MarketingSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface MarketingPage {
  slug: string;
  category: 'service' | 'platform' | 'solution';
  priority: 'P0' | 'P1' | 'P2';
  name: string;
  navLabel: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  problem: MarketingSection;
  whatWeBuild: MarketingSection;
  whoFor: MarketingSection;
  process: Array<{ name: string; text: string }>;
  faqs: FaqItem[];
  relatedServiceSlugs: string[];
  relatedIndustrySlugs?: string[];
  relatedProjectIds?: string[];
  internalLinkHints?: string[];
}

const sharedProcess = [
  { name: 'Discovery', text: 'We map workflows, systems, success metrics, and constraints before writing a line of automation.' },
  { name: 'Build', text: 'We implement workflows, agents, and integrations against your real stack, with testing and documentation.' },
  { name: 'Deploy', text: 'We ship to production with monitoring hooks, access controls, and a clear handoff.' },
  { name: 'Support', text: 'Optional retainers cover updates, new workflows, and reliability as your tools evolve.' },
];

function page(partial: Omit<MarketingPage, 'process'> & { process?: MarketingPage['process'] }): MarketingPage {
  return { process: sharedProcess, ...partial };
}

export const SERVICE_PAGES: MarketingPage[] = [
  page({
    slug: 'n8n-developer',
    category: 'platform',
    priority: 'P0',
    name: 'n8n Developer',
    navLabel: 'n8n Developer',
    targetKeyword: 'n8n developer',
    secondaryKeywords: ['n8n automation', 'hire n8n developer', 'n8n expert', 'n8n AI workflows'],
    searchIntent: 'Transactional, hire a specialist',
    metaTitle: 'n8n Developer & Automation Expert | Gbaski AI Services',
    metaDescription:
      'Hire an n8n developer for AI workflows, CRM sync, WhatsApp bots, and production automations. Discovery call in 24-48h. Nigeria · UK · US · remote.',
    h1: 'n8n Developer for Production AI Workflows',
    lead:
      'We design, self-host, and operate n8n workflows that connect CRM, messaging, APIs, and AI models, built for reliability, not fragile demos.',
    problem: {
      heading: 'When Zap sprawl and brittle scenarios start costing real money',
      body: 'Teams outgrow point-and-click automations when volume rises, credentials multiply, and AI steps need guardrails. You need an n8n developer who understands production: retries, observability, secrets, and clean data contracts.',
      bullets: [
        'Workflows fail silently and nobody notices until leads are cold',
        'AI steps hallucinate or write bad data into the CRM',
        'No ownership model for self-hosted n8n on AWS or your VPC',
      ],
    },
    whatWeBuild: {
      heading: 'What we ship in n8n',
      body: 'Production workflows with clear triggers, human-in-the-loop where needed, and AI steps that call tools safely.',
      bullets: [
        'CRM lead capture, enrichment, and routing',
        'WhatsApp / SMS / email orchestration',
        'OpenAI / Claude tool-calling inside workflows',
        'Webhooks, queues, and API integrations',
        'Self-hosted n8n on AWS with backups and access control',
      ],
    },
    whoFor: {
      heading: 'Who this is for',
      body: 'Operators, agencies, and product teams who want n8n as infrastructure, not a weekend experiment.',
      bullets: ['Agencies running client automations', 'SaaS teams wiring internal ops', 'Founders replacing Zapier at scale'],
    },
    faqs: [
      {
        question: 'Do you self-host n8n or use n8n Cloud?',
        answer:
          'Both. We recommend self-hosted n8n on AWS when you need tighter control over data, credentials, and cost at volume. Cloud works well for faster pilots.',
      },
      {
        question: 'Can you migrate Zapier or Make scenarios to n8n?',
        answer:
          'Yes. We inventory existing zaps/scenarios, redesign for n8n’s strengths, and migrate in phases so nothing breaks mid-flight.',
      },
      {
        question: 'How long does a typical n8n project take?',
        answer:
          'Focused workflows often ship in two to four weeks. Multi-system programmes are phased with milestones you can track.',
      },
    ],
    relatedServiceSlugs: ['make-automation', 'zapier-automation', 'crm-automation', 'whatsapp-ai-chatbot', 'ai-agents'],
    relatedProjectIds: ['gbaski-ai-chat', 'sisi-safe-calculator', 'rented123-ai-assistant'],
  }),
  page({
    slug: 'gohighlevel-automation',
    category: 'platform',
    priority: 'P0',
    name: 'GoHighLevel Automation',
    navLabel: 'GoHighLevel',
    targetKeyword: 'GoHighLevel automation',
    secondaryKeywords: ['GHL automation', 'GoHighLevel AI', 'HighLevel workflows', 'GHL chatbot'],
    searchIntent: 'Transactional',
    metaTitle: 'GoHighLevel Automation & AI Workflows | Gbaski AI Services',
    metaDescription:
      'Automate GoHighLevel pipelines, SMS/email follow-ups, lead routing, and AI agents. Built for agencies and operators who need reliable GHL systems.',
    h1: 'GoHighLevel Automation & AI Workflows',
    lead:
      'Pipelines, conversations, calendars, and follow-ups that run without your team babysitting HighLevel every hour.',
    problem: {
      heading: 'GHL is powerful, until workflows fight each other',
      body: 'Agencies often inherit messy snapshots: duplicate triggers, noisy SMS, and pipelines that do not match how sales actually works. We clean the system and automate the revenue path.',
      bullets: [
        'Leads sit unworked while notifications spam the wrong people',
        'Snapshots break after every client onboarding',
        'No connection between GHL and the rest of your stack',
      ],
    },
    whatWeBuild: {
      heading: 'GoHighLevel systems we implement',
      body: 'Revenue workflows with AI where it helps, qualification, replies, and routing, and humans where judgment matters.',
      bullets: [
        'Pipeline automation and stage-based actions',
        'AI chat and SMS assistants inside GHL',
        'Calendar booking and no-show recovery',
        'n8n / Make bridges to external CRMs and tools',
        'Reporting on speed-to-lead and conversion',
      ],
    },
    whoFor: {
      heading: 'Built for',
      body: 'Marketing agencies, local service businesses, and operators standardising client delivery on HighLevel.',
      bullets: ['Agency snapshot builders', 'Real estate and home services', 'Coaches and course businesses'],
    },
    faqs: [
      {
        question: 'Do you rebuild snapshots or fix existing sub-accounts?',
        answer:
          'Either. We audit first, then repair, rebuild, or productise a clean snapshot your team can reuse.',
      },
      {
        question: 'Can you connect GoHighLevel to WhatsApp or custom APIs?',
        answer:
          'Yes. We use native GHL features where they fit and n8n/custom APIs when you need deeper integrations.',
      },
    ],
    relatedServiceSlugs: ['crm-automation', 'lead-qualification-automation', 'whatsapp-ai-chatbot', 'email-sms-automation', 'n8n-developer'],
    relatedIndustrySlugs: ['real-estate', 'recruitment'],
  }),
  page({
    slug: 'hubspot-automation',
    category: 'platform',
    priority: 'P0',
    name: 'HubSpot Automation',
    navLabel: 'HubSpot',
    targetKeyword: 'HubSpot automation',
    secondaryKeywords: ['HubSpot workflows', 'HubSpot AI', 'HubSpot chatbot', 'HubSpot CRM automation'],
    searchIntent: 'Commercial',
    metaTitle: 'HubSpot Automation & AI Integration | Gbaski AI Services',
    metaDescription:
      'HubSpot workflows, lead scoring, chatbot handoff, and CRM enrichment with AI. Connect HubSpot to n8n, WhatsApp, and your backend.',
    h1: 'HubSpot Automation with AI Agents & Workflows',
    lead:
      'Cleaner lifecycle stages, smarter lead scoring, and AI that updates HubSpot without creating a mess your ops team has to undo.',
    problem: {
      heading: 'HubSpot workflows that create work instead of removing it',
      body: 'Uncontrolled properties, overlapping workflows, and disconnected chat tools leave sales with noise. We automate the path from form fill to qualified meeting.',
    },
    whatWeBuild: {
      heading: 'HubSpot automation we deliver',
      body: 'Lifecycle automation, enrichment, chatbot handoff, and bidirectional sync with the tools around HubSpot.',
      bullets: [
        'Lead scoring and routing',
        'Workflow rebuilds with clear ownership',
        'Chatbot and WhatsApp → HubSpot sync',
        'AI enrichment and meeting prep notes',
        'Reporting automation for pipeline health',
      ],
    },
    whoFor: {
      heading: 'Who this is for',
      body: 'B2B teams on HubSpot Marketing/Sales Hub that need automation tied to revenue, not vanity email sends.',
    },
    faqs: [
      {
        question: 'Do you work with HubSpot Free, Starter, Professional, or Enterprise?',
        answer:
          'Yes. Scope changes with Hub limits; we design around your tier and call out when an upgrade is actually worth it.',
      },
    ],
    relatedServiceSlugs: ['crm-automation', 'lead-qualification-automation', 'ai-chatbots', 'n8n-developer', 'salesforce-automation'],
    relatedIndustrySlugs: ['finance', 'ecommerce'],
  }),
  page({
    slug: 'crm-automation',
    category: 'service',
    priority: 'P0',
    name: 'CRM Automation',
    navLabel: 'CRM Automation',
    targetKeyword: 'CRM automation',
    secondaryKeywords: ['CRM workflow automation', 'CRM integration', 'automate CRM', 'lead capture automation'],
    searchIntent: 'Commercial',
    metaTitle: 'CRM Automation Services | Lead Capture & Qualification | Gbaski',
    metaDescription:
      'Automate CRM lead capture, qualification, routing, and follow-up across HubSpot, Salesforce, and GoHighLevel. Less manual entry. More closed deals.',
    h1: 'CRM Automation That Qualifies and Routes Leads',
    lead:
      'From first touch to owned opportunity, without copy-paste, missed follow-ups, or mystery pipeline stages.',
    problem: {
      heading: 'Your CRM is only as good as the data and discipline feeding it',
      body: 'Manual entry fails under volume. We automate capture, enrichment, qualification, assignment, and nurture so reps spend time on conversations that matter.',
    },
    whatWeBuild: {
      heading: 'CRM automation outcomes',
      body: 'Reliable pipelines across HubSpot, Salesforce, GoHighLevel, and custom CRMs.',
      bullets: [
        'Multi-channel lead capture into one record',
        'AI-assisted qualification and scoring',
        'Round-robin and territory routing',
        'Tasking, SLAs, and escalation',
        'Sync with WhatsApp, email, SMS, and calendars',
      ],
    },
    whoFor: {
      heading: 'Ideal clients',
      body: 'Sales-led teams that already have a CRM and know leakage is costing revenue.',
    },
    faqs: [
      {
        question: 'Which CRMs do you support?',
        answer:
          'HubSpot, Salesforce, GoHighLevel, and custom CRM APIs. If your CRM has a usable API or webhooks, we can usually automate it.',
      },
    ],
    relatedServiceSlugs: ['hubspot-automation', 'gohighlevel-automation', 'salesforce-automation', 'lead-qualification-automation', 'n8n-developer'],
  }),
  page({
    slug: 'whatsapp-ai-chatbot',
    category: 'platform',
    priority: 'P0',
    name: 'WhatsApp AI Chatbot',
    navLabel: 'WhatsApp AI',
    targetKeyword: 'WhatsApp AI chatbot',
    secondaryKeywords: ['WhatsApp chatbot development', 'WhatsApp Business AI', 'WhatsApp customer support bot'],
    searchIntent: 'Transactional',
    metaTitle: 'WhatsApp AI Chatbot Development | Gbaski AI Services',
    metaDescription:
      'Production WhatsApp AI chatbots for sales, support, and lead qualification. Integrated with CRM, payments, and your knowledge base.',
    h1: 'WhatsApp AI Chatbots for Sales & Support',
    lead:
      'Meet customers on the channel they already open every day, with AI that answers accurately, captures leads, and hands off cleanly to humans.',
    problem: {
      heading: 'WhatsApp is your front desk, but it does not scale with copy-paste replies',
      body: 'High message volume burns teams and creates inconsistent answers. A production WhatsApp AI chatbot needs CRM sync, guardrails, and escalation, not a toy prompt.',
    },
    whatWeBuild: {
      heading: 'WhatsApp AI systems',
      body: 'Business API integrations with AI retrieval, workflows, and human takeover.',
      bullets: [
        'Sales qualification and appointment booking',
        'Support deflection with knowledge bases',
        'CRM write-back (HubSpot, GHL, custom)',
        'Catalog, order status, and payment flows',
        'Analytics on containment and conversion',
      ],
    },
    whoFor: {
      heading: 'Where WhatsApp AI pays off',
      body: 'Businesses in Nigeria, Africa, and global brands whose customers live in WhatsApp.',
    },
    faqs: [
      {
        question: 'Do you work with the WhatsApp Business API?',
        answer:
          'Yes. We implement via approved BSPs and connect AI, CRM, and automation layers on top.',
      },
      {
        question: 'Can the bot hand off to a human agent?',
        answer:
          'Yes. Escalation rules route to your team with full conversation context.',
      },
    ],
    relatedServiceSlugs: ['ai-chatbots', 'ai-customer-support', 'crm-automation', 'n8n-developer', 'voice-ai-agent'],
    relatedIndustrySlugs: ['ecommerce', 'healthcare', 'real-estate', 'hospitality'],
    relatedProjectIds: ['gbaski-ai-chat'],
  }),
  page({
    slug: 'ai-agents',
    category: 'service',
    priority: 'P1',
    name: 'AI Agents',
    navLabel: 'AI Agents',
    targetKeyword: 'AI agents',
    secondaryKeywords: ['custom AI agents', 'AI agent development', 'autonomous AI agents', 'LangGraph agents'],
    searchIntent: 'Commercial',
    metaTitle: 'Custom AI Agents Development | Gbaski AI Services',
    metaDescription:
      'Custom AI agents with tools, memory, and guardrails, connected to your CRM, APIs, and knowledge base. Built for production on OpenAI, Claude, and LangGraph.',
    h1: 'Custom AI Agents Built for Your Stack',
    lead:
      'Agents that take actions in your systems, with permissions, logging, and human approval where risk is high.',
    problem: {
      heading: 'Chatbots answer. Agents do work.',
      body: 'If you need research, ticket updates, CRM writes, or multi-step ops, you need tool-calling agents with clear boundaries, not an unbounded chatbot.',
    },
    whatWeBuild: {
      heading: 'Agent capabilities',
      body: 'Purpose-built agents for support, sales ops, internal assistants, and workflow orchestration.',
      bullets: ['Tool calling into APIs and CRMs', 'LangGraph multi-step flows', 'Memory and audit logs', 'Guardrails and approval gates'],
    },
    whoFor: {
      heading: 'For teams that need action, not chat',
      body: 'Product and operations teams ready to put AI behind authenticated tools.',
    },
    faqs: [
      {
        question: 'Do you use LangGraph, OpenAI Assistants, or custom orchestration?',
        answer:
          'We pick the orchestration layer that fits the job. LangGraph is common for multi-step control; simpler agents use direct tool-calling APIs.',
      },
    ],
    relatedServiceSlugs: ['rag-development', 'ai-chatbots', 'api-integration', 'n8n-developer'],
    relatedProjectIds: ['rented123-ai-assistant', 'tai-librechat'],
  }),
  page({
    slug: 'ai-chatbots',
    category: 'service',
    priority: 'P1',
    name: 'AI Chatbots',
    navLabel: 'AI Chatbots',
    targetKeyword: 'AI chatbots',
    secondaryKeywords: ['customer support chatbot', 'AI chatbot development', 'website chatbot'],
    searchIntent: 'Commercial',
    metaTitle: 'AI Chatbot Development for Support & Leads | Gbaski AI Services',
    metaDescription:
      'AI chatbots for customer support and lead capture on web, WhatsApp, and helpdesk channels, grounded in your knowledge base and CRM.',
    h1: 'AI Chatbots for Customer Support & Lead Capture',
    lead:
      'Accurate answers, qualified leads, and clean handoffs, on web chat, WhatsApp, and your helpdesk.',
    problem: {
      heading: 'Generic chat widgets frustrate customers and sales',
      body: 'Without retrieval, CRM context, and escalation rules, chatbots create tickets instead of closing them.',
    },
    whatWeBuild: {
      heading: 'Chatbot systems',
      body: 'Grounded conversational AI with analytics and CRM sync.',
      bullets: ['Website and in-app assistants', 'Helpdesk deflection', 'Lead qualification flows', 'Knowledge-base grounded answers'],
    },
    whoFor: {
      heading: 'Best fit',
      body: 'Support and growth teams with repeatable questions and a real knowledge source.',
    },
    faqs: [
      {
        question: 'Will the chatbot invent answers?',
        answer:
          'We ground responses in approved content and configure refusal behaviour when confidence is low.',
      },
    ],
    relatedServiceSlugs: ['whatsapp-ai-chatbot', 'ai-customer-support', 'rag-development', 'ai-agents'],
  }),
  page({
    slug: 'voice-ai-agent',
    category: 'service',
    priority: 'P1',
    name: 'Voice AI Agent',
    navLabel: 'Voice AI',
    targetKeyword: 'Voice AI agent',
    secondaryKeywords: ['AI voice agent', 'ElevenLabs agent', 'Retell AI', 'Bland AI', 'phone AI agent'],
    searchIntent: 'Commercial',
    metaTitle: 'Voice AI Agents for Phone Support & Sales | Gbaski AI Services',
    metaDescription:
      'Voice AI agents for inbound support, outbound qualification, and appointment setting, with ElevenLabs, Retell, Bland, and Twilio integrations.',
    h1: 'Voice AI Agents for Phone Support & Sales',
    lead:
      'Natural phone conversations that book meetings, answer FAQs, and log outcomes into your CRM.',
    problem: {
      heading: 'Missed calls are missed revenue',
      body: 'After-hours and overflow calls drop. Voice AI covers the gap with consistent scripts and clean CRM notes.',
    },
    whatWeBuild: {
      heading: 'Voice AI deliveries',
      body: 'Inbound and outbound agents with telephony, transcription, and workflow hooks.',
      bullets: ['Inbound support and FAQ', 'Outbound qualification', 'Appointment setting', 'CRM and calendar sync', 'ElevenLabs / Retell / Bland / Twilio'],
    },
    whoFor: {
      heading: 'Strong fit',
      body: 'Recruitment, clinics, real estate, and service businesses with high call volume.',
    },
    faqs: [
      {
        question: 'Can callers reach a human?',
        answer: 'Yes. We design warm transfer and callback paths when the agent cannot resolve the request.',
      },
    ],
    relatedServiceSlugs: ['ai-agents', 'whatsapp-ai-chatbot', 'lead-qualification-automation', 'email-sms-automation'],
    relatedIndustrySlugs: ['recruitment', 'healthcare', 'real-estate'],
  }),
  page({
    slug: 'lead-qualification-automation',
    category: 'solution',
    priority: 'P1',
    name: 'Lead Qualification Automation',
    navLabel: 'Lead Qualification',
    targetKeyword: 'lead qualification automation',
    secondaryKeywords: ['automated lead qualification', 'AI lead scoring', 'speed to lead automation'],
    searchIntent: 'Transactional',
    metaTitle: 'Lead Qualification Automation | Gbaski AI Services',
    metaDescription:
      'Automate lead qualification, scoring, and routing so sales only talks to high-intent prospects. Web, WhatsApp, voice, and CRM connected.',
    h1: 'Lead Qualification Automation for Faster Pipeline',
    lead:
      'Respond in minutes, score with consistent criteria, and route to the right owner, automatically.',
    problem: {
      heading: 'Speed-to-lead dies in shared inboxes',
      body: 'When qualification is manual, hot leads cool off. Automation enforces your criteria every time.',
    },
    whatWeBuild: {
      heading: 'Qualification systems',
      body: 'Multi-channel intake with AI questions, scoring, and CRM updates.',
      bullets: ['Instant response sequences', 'AI discovery questions', 'Scoring models', 'Round-robin routing', 'Meeting booking'],
    },
    whoFor: {
      heading: 'For',
      body: 'Sales teams that already know what a qualified lead looks like.',
    },
    faqs: [
      {
        question: 'Can qualification run on WhatsApp and web forms together?',
        answer: 'Yes. We normalise all channels into one CRM qualification path.',
      },
    ],
    relatedServiceSlugs: ['crm-automation', 'gohighlevel-automation', 'hubspot-automation', 'whatsapp-ai-chatbot'],
  }),
  page({
    slug: 'rag-development',
    category: 'service',
    priority: 'P1',
    name: 'RAG Development',
    navLabel: 'RAG Development',
    targetKeyword: 'RAG development',
    secondaryKeywords: ['retrieval augmented generation', 'AI knowledge base', 'internal knowledge assistant'],
    searchIntent: 'Commercial',
    metaTitle: 'RAG Development & Knowledge Assistants | Gbaski AI Services',
    metaDescription:
      'RAG systems and internal knowledge assistants grounded in your docs, wikis, and policies, with evaluation, citations, and access control.',
    h1: 'RAG Systems & Internal Knowledge Assistants',
    lead:
      'Answers from your documents, cited, permission-aware, and measurable, for teams drowning in Confluence, Drive, and PDFs.',
    problem: {
      heading: 'Tribal knowledge does not scale',
      body: 'New hires and support agents waste hours hunting answers. RAG puts approved knowledge behind a reliable assistant.',
    },
    whatWeBuild: {
      heading: 'RAG & knowledge systems',
      body: 'Ingestion pipelines, retrieval, evaluation, and chat/voice interfaces.',
      bullets: ['Document ingestion & chunking', 'Hybrid search', 'Citations and refusals', 'Access control', 'Internal AI assistants'],
    },
    whoFor: {
      heading: 'Best for',
      body: 'Companies with substantial internal documentation and support content.',
    },
    faqs: [
      {
        question: 'Do you fine-tune models or use RAG?',
        answer:
          'Most business knowledge problems are better solved with RAG first. We fine-tune only when there is a clear, measured need.',
      },
    ],
    relatedServiceSlugs: ['ai-agents', 'ai-chatbots', 'ai-document-processing', 'api-integration'],
    relatedProjectIds: ['tai-librechat', 'rented123-ai-assistant'],
  }),
  page({
    slug: 'api-integration',
    category: 'service',
    priority: 'P1',
    name: 'API Integration',
    navLabel: 'API Integration',
    targetKeyword: 'API integration',
    secondaryKeywords: ['SaaS integration', 'custom API integration', 'webhook integration'],
    searchIntent: 'Commercial',
    metaTitle: 'API & SaaS Integration for AI Workflows | Gbaski AI Services',
    metaDescription:
      'API and SaaS integrations that connect CRMs, messaging, payments, and AI systems, with auth, retries, and clear data contracts.',
    h1: 'API & SaaS Integration for AI Workflows',
    lead:
      'Reliable connections between the tools you already pay for, so AI and automation have clean data to work with.',
    problem: {
      heading: 'Integrations fail at the edges',
      body: 'Auth expiry, partial writes, and undocumented APIs create silent failures. We treat integrations as production software.',
    },
    whatWeBuild: {
      heading: 'Integration work',
      body: 'REST/GraphQL connectors, webhooks, middleware, and n8n bridges.',
      bullets: ['CRM and billing APIs', 'Messaging platforms', 'Custom backend services', 'Event-driven sync', 'Golang / AWS when scale demands it'],
    },
    whoFor: {
      heading: 'For',
      body: 'Teams stitching SaaS tools and custom backends into one operating system.',
    },
    faqs: [
      {
        question: 'Do you build custom APIs or only consume them?',
        answer: 'Both. We often add a thin secure gateway when third-party tools should not talk to each other directly.',
      },
    ],
    relatedServiceSlugs: ['n8n-developer', 'ai-agents', 'crm-automation', 'shopify-automation'],
    relatedProjectIds: ['rented123-ai-assistant'],
  }),
  page({
    slug: 'business-process-automation',
    category: 'service',
    priority: 'P1',
    name: 'Business Process Automation',
    navLabel: 'Business Automation',
    targetKeyword: 'business process automation',
    secondaryKeywords: ['BPA', 'ops automation', 'workflow automation company'],
    searchIntent: 'Commercial',
    metaTitle: 'Business Process Automation with AI | Gbaski AI Services',
    metaDescription:
      'Business process automation with AI, approvals, ops workflows, notifications, and system sync designed around how your team actually works.',
    h1: 'Business Process Automation with AI',
    lead:
      'Turn SOPs into reliable workflows: fewer handoffs, fewer errors, clearer ownership.',
    problem: {
      heading: 'SOPs in Notion do not run themselves',
      body: 'We translate process documentation into automations with exceptions handled and humans in the loop where needed.',
    },
    whatWeBuild: {
      heading: 'Process automation scope',
      body: 'Cross-team workflows spanning forms, CRMs, docs, messaging, and finance tools.',
      bullets: ['Approvals and routing', 'Onboarding workflows', 'Ops alerts', 'Document generation', 'Reporting packs'],
    },
    whoFor: {
      heading: 'For',
      body: 'Ops-led SMEs and growing teams drowning in repetitive coordination.',
    },
    faqs: [
      {
        question: 'How do you decide what to automate first?',
        answer:
          'We score processes by frequency, cost of error, and data readiness, then pilot the highest-ROI workflow.',
      },
    ],
    relatedServiceSlugs: ['ai-workflow-automation', 'n8n-developer', 'reporting-dashboard-automation', 'crm-automation'],
  }),
  page({
    slug: 'ai-workflow-automation',
    category: 'service',
    priority: 'P0',
    name: 'AI Workflow Automation',
    navLabel: 'AI Workflow Automation',
    targetKeyword: 'AI workflow automation',
    secondaryKeywords: ['AI automation agency', 'workflow automation', 'AI automation consultant'],
    searchIntent: 'Commercial',
    metaTitle: 'AI Workflow Automation Agency | Gbaski AI Services',
    metaDescription:
      'AI workflow automation for CRM, support, and operations. We design and ship production systems on n8n, Make, Zapier, and custom APIs.',
    h1: 'AI Workflow Automation Built for Production',
    lead:
      'Automations that combine your business rules with AI reasoning, deployed, monitored, and owned by you.',
    problem: {
      heading: 'Automation without AI is incomplete, AI without workflow is chaos',
      body: 'We connect both: structured workflows for reliability, AI for judgment-heavy steps.',
    },
    whatWeBuild: {
      heading: 'Workflow automation offerings',
      body: 'Design-to-deploy programmes for revenue, support, and internal ops.',
      bullets: ['Trigger design and orchestration', 'AI decision steps', 'Human approvals', 'Cross-app sync', 'Monitoring'],
    },
    whoFor: {
      heading: 'For',
      body: 'Companies ready to replace manual glue work with durable systems.',
    },
    faqs: [
      {
        question: 'Are you an AI automation agency or a staffing firm?',
        answer:
          'We are a delivery team. We scope, build, and ship systems, with optional retainers, rather than placing contractors into your standup forever.',
      },
    ],
    relatedServiceSlugs: ['n8n-developer', 'business-process-automation', 'ai-agents', 'crm-automation'],
  }),
  page({
    slug: 'make-automation',
    category: 'platform',
    priority: 'P1',
    name: 'Make.com Automation',
    navLabel: 'Make.com',
    targetKeyword: 'Make.com automation',
    secondaryKeywords: ['Make automation', 'Integromat expert', 'Make scenarios'],
    searchIntent: 'Transactional',
    metaTitle: 'Make.com Automation Experts | Gbaski AI Services',
    metaDescription:
      'Make.com (Integromat) automation for CRM, marketing, and ops, scenarios built for clarity, error handling, and scale.',
    h1: 'Make.com Automation for Reliable Scenarios',
    lead: 'Visual scenarios that stay maintainable as your stack grows, with AI modules where they earn their keep.',
    problem: {
      heading: 'Spaghetti scenarios are expensive',
      body: 'We refactor and rebuild Make scenarios with modules, error routes, and documentation your team can inherit.',
    },
    whatWeBuild: {
      heading: 'Make deliveries',
      body: 'CRM sync, lead flows, content ops, and SaaS glue.',
      bullets: ['Scenario architecture', 'Data stores & iterators', 'Error handling', 'AI modules', 'Migration to/from n8n'],
    },
    whoFor: {
      heading: 'For',
      body: 'Teams standardised on Make who need senior scenario design.',
    },
    faqs: [
      {
        question: 'Should we stay on Make or move to n8n?',
        answer:
          'It depends on volume, hosting needs, and complexity. We advise honestly and can support either path.',
      },
    ],
    relatedServiceSlugs: ['n8n-developer', 'zapier-automation', 'crm-automation'],
  }),
  page({
    slug: 'zapier-automation',
    category: 'platform',
    priority: 'P1',
    name: 'Zapier Automation',
    navLabel: 'Zapier',
    targetKeyword: 'Zapier automation',
    secondaryKeywords: ['Zapier expert', 'Zapier CRM', 'hire Zapier freelancer'],
    searchIntent: 'Transactional',
    metaTitle: 'Zapier Automation Experts | Gbaski AI Services',
    metaDescription:
      'Zapier automation for lead capture, CRM updates, and lightweight AI steps, with a clear path to n8n when you outgrow Zaps.',
    h1: 'Zapier Automation That Stays Maintainable',
    lead: 'Fast, reliable Zaps for teams that need results this week, without painting yourself into a corner.',
    problem: {
      heading: 'Hundreds of Zaps, zero documentation',
      body: 'We audit, consolidate, and rebuild the Zaps that actually drive revenue.',
    },
    whatWeBuild: {
      heading: 'Zapier work',
      body: 'Lead routing, notifications, spreadsheet ops, and AI actions.',
      bullets: ['Zap redesign', 'Paths & filters', 'Tables / Storage', 'Interfaces', 'Migration planning'],
    },
    whoFor: {
      heading: 'For',
      body: 'Startups and SMEs standardised on Zapier.',
    },
    faqs: [
      {
        question: 'When should we leave Zapier?',
        answer:
          'When task volume, custom logic, or data residency makes self-hosted n8n or custom services more economical and controllable.',
      },
    ],
    relatedServiceSlugs: ['n8n-developer', 'make-automation', 'crm-automation'],
  }),
  page({
    slug: 'salesforce-automation',
    category: 'platform',
    priority: 'P1',
    name: 'Salesforce Automation',
    navLabel: 'Salesforce',
    targetKeyword: 'Salesforce automation',
    secondaryKeywords: ['Salesforce Flow', 'Salesforce AI', 'Salesforce integration'],
    searchIntent: 'Commercial',
    metaTitle: 'Salesforce Automation & AI Integration | Gbaski AI Services',
    metaDescription:
      'Salesforce automation with Flow, integrations, and AI assistants that update records cleanly and respect your data model.',
    h1: 'Salesforce Automation with AI Where It Helps',
    lead: 'Flow, integrations, and AI that respect your Salesforce data model, not shadow spreadsheets.',
    problem: {
      heading: 'Salesforce complexity without operational clarity',
      body: 'We automate lead-to-cash and service processes with integrations your admins can still govern.',
    },
    whatWeBuild: {
      heading: 'Salesforce scope',
      body: 'Flow automation, middleware, and AI copilots for sales and service.',
      bullets: ['Lead & case routing', 'Flow rebuilds', 'External sync', 'AI summarisation', 'Reporting'],
    },
    whoFor: {
      heading: 'For',
      body: 'Mid-market and enterprise teams on Sales/Service Cloud.',
    },
    faqs: [
      {
        question: 'Do you replace Salesforce admins?',
        answer:
          'No. We partner with your admins and document everything so ownership stays with you.',
      },
    ],
    relatedServiceSlugs: ['crm-automation', 'hubspot-automation', 'api-integration'],
  }),
  page({
    slug: 'ai-customer-support',
    category: 'solution',
    priority: 'P1',
    name: 'AI Customer Support',
    navLabel: 'AI Customer Support',
    targetKeyword: 'AI customer support',
    secondaryKeywords: ['AI helpdesk', 'support automation', 'ticket deflection AI'],
    searchIntent: 'Commercial',
    metaTitle: 'AI Customer Support & Helpdesk Automation | Gbaski AI Services',
    metaDescription:
      'AI customer support that deflects tickets, drafts replies, and escalates with context, across helpdesk, web chat, and WhatsApp.',
    h1: 'AI Customer Support That Actually Deflects Tickets',
    lead: 'Containment you can measure, with humans staying in control of exceptions.',
    problem: {
      heading: 'Ticket volume grows faster than headcount',
      body: 'AI support works when grounded in your macros, policies, and product truth.',
    },
    whatWeBuild: {
      heading: 'Support AI systems',
      body: 'Helpdesk assistants, chat deflection, and agent copilots.',
      bullets: ['Knowledge-grounded answers', 'Macro drafting', 'Escalation rules', 'CSAT-aware flows'],
    },
    whoFor: {
      heading: 'For',
      body: 'Support leaders with repeatable issue patterns.',
    },
    faqs: [
      {
        question: 'Which helpdesks do you integrate?',
        answer:
          'Common platforms via API (and email/WhatsApp channels). Tell us your stack in discovery.',
      },
    ],
    relatedServiceSlugs: ['ai-chatbots', 'whatsapp-ai-chatbot', 'rag-development', 'voice-ai-agent'],
  }),
  page({
    slug: 'email-sms-automation',
    category: 'solution',
    priority: 'P2',
    name: 'Email & SMS Automation',
    navLabel: 'Email & SMS',
    targetKeyword: 'email automation',
    secondaryKeywords: ['SMS automation', 'Twilio automation', 'lifecycle messaging'],
    searchIntent: 'Commercial',
    metaTitle: 'Email & SMS Automation (Twilio) | Gbaski AI Services',
    metaDescription:
      'Email and SMS automation for lifecycle messaging, alerts, and lead follow-up, including Twilio-powered workflows tied to your CRM.',
    h1: 'Email & SMS Automation That Stays Relevant',
    lead: 'Timed, triggered messaging with consent, personalisation, and CRM truth, including Twilio when you need programmable SMS and voice.',
    problem: {
      heading: 'Blast messaging trains customers to ignore you',
      body: 'We build triggered journeys tied to real events and preferences.',
    },
    whatWeBuild: {
      heading: 'Messaging automation',
      body: 'Lifecycle email/SMS, alerts, and two-way SMS flows.',
      bullets: ['Twilio SMS/voice', 'CRM-triggered journeys', 'Compliance-minded consent', 'Delivery monitoring'],
    },
    whoFor: {
      heading: 'For',
      body: 'Teams running lifecycle or operational messaging at volume.',
    },
    faqs: [
      {
        question: 'Do you handle opt-out and compliance?',
        answer:
          'We implement opt-out handling and advise on consent practices. Legal compliance remains your responsibility in each jurisdiction.',
      },
    ],
    relatedServiceSlugs: ['crm-automation', 'gohighlevel-automation', 'voice-ai-agent'],
  }),
  page({
    slug: 'ai-document-processing',
    category: 'solution',
    priority: 'P2',
    name: 'AI Document Processing',
    navLabel: 'Document Processing',
    targetKeyword: 'AI document processing',
    secondaryKeywords: ['OCR automation', 'document AI', 'invoice OCR'],
    searchIntent: 'Commercial',
    metaTitle: 'AI Document Processing & OCR Automation | Gbaski AI Services',
    metaDescription:
      'AI document processing and OCR automation for invoices, forms, and KYC packs, extracted, validated, and written into your systems.',
    h1: 'AI Document Processing & OCR Automation',
    lead: 'Turn PDFs and scans into structured data your CRM and ops tools can use.',
    problem: {
      heading: 'Manual data entry from documents is slow and error-prone',
      body: 'We combine OCR, validation rules, and human review queues for exceptions.',
    },
    whatWeBuild: {
      heading: 'Document AI pipelines',
      body: 'Ingestion, extraction, validation, and system write-back.',
      bullets: ['Invoices and receipts', 'Forms and applications', 'KYC packs', 'Exception review UIs'],
    },
    whoFor: {
      heading: 'For',
      body: 'Finance, insurance, legal, and ops teams buried in paperwork.',
    },
    faqs: [
      {
        question: 'How accurate is extraction?',
        answer:
          'Accuracy depends on document quality. We measure field-level accuracy and add human review for low-confidence fields.',
      },
    ],
    relatedServiceSlugs: ['rag-development', 'business-process-automation', 'api-integration'],
    relatedIndustrySlugs: ['finance', 'insurance', 'legal'],
  }),
  page({
    slug: 'shopify-automation',
    category: 'platform',
    priority: 'P2',
    name: 'Shopify Automation',
    navLabel: 'Shopify',
    targetKeyword: 'Shopify automation',
    secondaryKeywords: ['Shopify AI', 'Shopify WhatsApp', 'ecommerce automation'],
    searchIntent: 'Commercial',
    metaTitle: 'Shopify Automation & AI Support | Gbaski AI Services',
    metaDescription:
      'Shopify automation for orders, support, and WhatsApp commerce, AI assistants connected to inventory and customer data.',
    h1: 'Shopify Automation for Ops & Customer Experience',
    lead: 'Order ops, support deflection, and messaging flows wired into Shopify.',
    problem: {
      heading: 'Support tickets mirror the same order questions',
      body: 'We automate answers and back-office steps using live Shopify data.',
    },
    whatWeBuild: {
      heading: 'Shopify automation',
      body: 'Support bots, fulfilment alerts, and CRM sync.',
      bullets: ['Order status assistants', 'WhatsApp commerce flows', 'Returns triage', 'Inventory alerts'],
    },
    whoFor: {
      heading: 'For',
      body: 'Growing Shopify brands with repetitive support and ops load.',
    },
    faqs: [
      {
        question: 'Do you build Shopify apps?',
        answer:
          'We primarily integrate via APIs and automation platforms. Custom app work is scoped when needed.',
      },
    ],
    relatedServiceSlugs: ['whatsapp-ai-chatbot', 'ai-customer-support', 'api-integration'],
    relatedIndustrySlugs: ['ecommerce'],
  }),
  page({
    slug: 'google-workspace-automation',
    category: 'solution',
    priority: 'P2',
    name: 'Google Workspace Automation',
    navLabel: 'Google Workspace',
    targetKeyword: 'Google Workspace automation',
    secondaryKeywords: ['Google Sheets automation', 'Gmail automation', 'Google Drive automation'],
    searchIntent: 'Commercial',
    metaTitle: 'Google Workspace Automation | Gbaski AI Services',
    metaDescription:
      'Automate Gmail, Sheets, Drive, and Docs workflows, including AI drafting and reporting packs tied to your CRM.',
    h1: 'Google Workspace Automation for Ops Teams',
    lead: 'Sheets, Gmail, and Drive working as a coordinated system, with a path off spreadsheets when you outgrow them.',
    problem: {
      heading: 'Critical ops living in fragile spreadsheets',
      body: 'We harden Workspace workflows and graduate the risky ones into proper systems.',
    },
    whatWeBuild: {
      heading: 'Workspace automation',
      body: 'Approvals, reporting, document generation, and inbox triage.',
      bullets: ['Sheets pipelines', 'Gmail triage', 'Docs generation', 'Drive organisation', 'AI drafting'],
    },
    whoFor: {
      heading: 'For',
      body: 'Teams whose operating system is still Google Workspace.',
    },
    faqs: [
      {
        question: 'Can you automate Google Sheets safely?',
        answer:
          'Yes, with locks, validation, and monitoring. We also tell you when Sheets is the wrong long-term store.',
      },
    ],
    relatedServiceSlugs: ['reporting-dashboard-automation', 'business-process-automation', 'n8n-developer'],
  }),
  page({
    slug: 'reporting-dashboard-automation',
    category: 'solution',
    priority: 'P2',
    name: 'Reporting Dashboard Automation',
    navLabel: 'Reporting Automation',
    targetKeyword: 'reporting dashboard automation',
    secondaryKeywords: ['automated reporting', 'ops dashboards', 'AI reporting'],
    searchIntent: 'Commercial',
    metaTitle: 'Reporting Dashboard Automation | Gbaski AI Services',
    metaDescription:
      'Automated reporting dashboards and scheduled insight packs from CRM, ads, and ops data, less manual spreadsheet ritual.',
    h1: 'Reporting Dashboard Automation',
    lead: 'Numbers that refresh themselves, with narrative summaries your team will actually read.',
    problem: {
      heading: 'Monday mornings lost to copy-paste reporting',
      body: 'We automate extraction, transformation, and delivery of the metrics leadership asks for weekly.',
    },
    whatWeBuild: {
      heading: 'Reporting systems',
      body: 'Pipelines into dashboards plus optional AI narrative summaries.',
      bullets: ['Scheduled reports', 'CRM/ads joins', 'Anomaly alerts', 'Executive summaries'],
    },
    whoFor: {
      heading: 'For',
      body: 'Operators and founders who need trustworthy weekly numbers.',
    },
    faqs: [
      {
        question: 'Do you build BI tools or automate existing ones?',
        answer:
          'Both. We often automate feeds into tools you already use, or ship lightweight dashboards when that is faster.',
      },
    ],
    relatedServiceSlugs: ['google-workspace-automation', 'crm-automation', 'api-integration'],
  }),
  page({
    slug: 'airtable-automation',
    category: 'solution',
    priority: 'P2',
    name: 'Airtable Automation',
    navLabel: 'Airtable',
    targetKeyword: 'Airtable automation',
    secondaryKeywords: ['Airtable AI', 'Airtable workflows', 'Airtable interfaces'],
    searchIntent: 'Commercial',
    metaTitle: 'Airtable Automation | Gbaski AI Services',
    metaDescription:
      'Airtable automation for ops bases, interfaces, and AI-assisted workflows, connected to CRM, Slack, and your wider stack.',
    h1: 'Airtable Automation for Operational Bases',
    lead: 'Bases that run like lightweight apps, with automations and AI that keep records clean.',
    problem: {
      heading: 'Airtable becomes a junk drawer',
      body: 'We redesign schema, interfaces, and automations so the base stays trustworthy.',
    },
    whatWeBuild: {
      heading: 'Airtable systems',
      body: 'Schema design, interfaces, automations, and integrations.',
      bullets: ['Base architecture', 'Interface apps', 'Automation scripts', 'Sync to CRM/Slack'],
    },
    whoFor: {
      heading: 'For',
      body: 'Ops teams using Airtable as a system of record for a process.',
    },
    faqs: [
      {
        question: 'When should we leave Airtable?',
        answer:
          'When permissions, volume, or relational complexity demand a proper database or CRM. We help plan that transition.',
      },
    ],
    relatedServiceSlugs: ['business-process-automation', 'n8n-developer', 'google-workspace-automation'],
  }),
];

export function getServiceBySlug(slug: string): MarketingPage | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug);
}

export function getServicesByPriority(priority: MarketingPage['priority']): MarketingPage[] {
  return SERVICE_PAGES.filter((page) => page.priority === priority);
}

export function getRelatedServices(page: MarketingPage): MarketingPage[] {
  return page.relatedServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is MarketingPage => Boolean(item));
}

export const SERVICE_HUB = {
  metaTitle: 'AI Automation Services | Agents, CRM, Chatbots & Integrations | Gbaski',
  metaDescription:
    'Explore Gbaski AI Services: AI workflow automation, agents, CRM automation, WhatsApp chatbots, n8n, HubSpot, GoHighLevel, voice AI, and RAG systems.',
  h1: 'AI Automation Services',
  lead: 'Production systems across workflow automation, agents, CRM, conversational AI, and integrations, for teams in Nigeria, the UK, the US, and remote worldwide.',
};
