export interface NavChild {
  label: string;
  path: string;
  description?: string;
}

export interface NavItem {
  label: string;
  path?: string;
  children?: NavChild[];
}

export const PRIMARY_NAV: NavItem[] = [
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'AI Workflow Automation', path: '/services/ai-workflow-automation', description: 'End-to-end workflow systems' },
      { label: 'AI Agents', path: '/services/ai-agents', description: 'Custom agents with tools & guardrails' },
      { label: 'AI Chatbots', path: '/services/ai-chatbots', description: 'Support & lead-capture bots' },
      { label: 'CRM Automation', path: '/services/crm-automation', description: 'Capture, qualify, route, follow up' },
      { label: 'Voice AI Agents', path: '/services/voice-ai-agent', description: 'Phone support & sales agents' },
      { label: 'RAG Development', path: '/services/rag-development', description: 'Knowledge assistants on your data' },
      { label: 'API Integration', path: '/services/api-integration', description: 'SaaS & backend integrations' },
      { label: 'Business Process Automation', path: '/services/business-process-automation', description: 'Ops automation that ships' },
    ],
  },
  {
    label: 'Platforms',
    path: '/services',
    children: [
      { label: 'n8n Developer', path: '/services/n8n-developer' },
      { label: 'Make.com Automation', path: '/services/make-automation' },
      { label: 'Zapier Automation', path: '/services/zapier-automation' },
      { label: 'GoHighLevel Automation', path: '/services/gohighlevel-automation' },
      { label: 'HubSpot Automation', path: '/services/hubspot-automation' },
      { label: 'Salesforce Automation', path: '/services/salesforce-automation' },
      { label: 'WhatsApp AI Chatbot', path: '/services/whatsapp-ai-chatbot' },
      { label: 'Shopify Automation', path: '/services/shopify-automation' },
    ],
  },
  {
    label: 'Solutions',
    path: '/services',
    children: [
      { label: 'Lead Qualification Automation', path: '/services/lead-qualification-automation' },
      { label: 'AI Customer Support', path: '/services/ai-customer-support' },
      { label: 'Email & SMS Automation', path: '/services/email-sms-automation' },
      { label: 'Document Processing / OCR', path: '/services/ai-document-processing' },
      { label: 'Reporting Dashboards', path: '/services/reporting-dashboard-automation' },
      { label: 'Google Workspace Automation', path: '/services/google-workspace-automation' },
    ],
  },
  {
    label: 'Industries',
    path: '/industries',
    children: [
      { label: 'Healthcare', path: '/industries/healthcare' },
      { label: 'Real Estate', path: '/industries/real-estate' },
      { label: 'Finance', path: '/industries/finance' },
      { label: 'E-commerce', path: '/industries/ecommerce' },
      { label: 'Recruitment', path: '/industries/recruitment' },
      { label: 'Logistics', path: '/industries/logistics' },
      { label: 'All industries', path: '/industries' },
    ],
  },
  { label: 'Case Studies', path: '/case-studies' },
  {
    label: 'Resources',
    path: '/resources',
    children: [
      { label: 'Blog', path: '/blog' },
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'Locations', path: '/locations' },
    ],
  },
];

export const FOOTER_NAV = {
  services: [
    { label: 'AI Automation', path: '/services/ai-workflow-automation' },
    { label: 'AI Agents', path: '/services/ai-agents' },
    { label: 'CRM Automation', path: '/services/crm-automation' },
    { label: 'n8n Developer', path: '/services/n8n-developer' },
    { label: 'WhatsApp AI', path: '/services/whatsapp-ai-chatbot' },
    { label: 'HubSpot Automation', path: '/services/hubspot-automation' },
  ],
  company: [
    { label: 'About', path: '/about' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
    { label: 'Book a call', path: '/contact' },
  ],
  locations: [
    { label: 'Nigeria', path: '/locations/nigeria' },
    { label: 'Lagos', path: '/locations/lagos' },
    { label: 'United Kingdom', path: '/locations/united-kingdom' },
    { label: 'United States', path: '/locations/united-states' },
  ],
};
