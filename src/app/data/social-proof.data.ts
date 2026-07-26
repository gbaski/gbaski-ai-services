export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'They did not hand us a demo chatbot. They shipped a secure assistant wired into our auth and account data, the kind of build you can put in front of real users.',
    name: 'Product stakeholder',
    role: 'Product & engineering partner',
    company: 'Rented123',
  },
  {
    quote:
      'The internal AI workspace gave our content team a reliable way to draft and evaluate structured outputs without reinventing our publishing pipeline.',
    name: 'Publishing ops lead',
    role: 'Operations',
    company: 'Tinglemore',
  },
  {
    quote:
      'WhatsApp and workflow automation only work if someone owns production details. Gbaski treated n8n like infrastructure, not a toy.',
    name: 'Operations lead',
    role: 'Events platform',
    company: 'Gbaski',
  },
];

export interface PricingTier {
  id: string;
  name: string;
  summary: string;
  fits: string;
  fromLabel: string;
  features: string[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'pilot',
    name: 'Pilot',
    summary: 'One high-ROI workflow, fixed scope, clear success metric.',
    fits: 'Teams validating AI automation before a wider rollout.',
    fromLabel: 'From a few thousand USD',
    features: [
      'Discovery workshop',
      'Single production workflow or agent',
      'Documentation & handoff',
      '2 weeks post-launch stabilisation',
    ],
  },
  {
    id: 'build',
    name: 'Build',
    summary: 'Multi-system automation or agent programme with milestones.',
    fits: 'CRM, WhatsApp, and ops programmes across several tools.',
    fromLabel: 'Quoted after discovery',
    features: [
      'Architecture & delivery plan',
      'Multiple workflows / channels',
      'Integrations & testing',
      'Training for your operators',
    ],
  },
  {
    id: 'retain',
    name: 'Retain',
    summary: 'Monitoring, iteration, and new workflows as your stack evolves.',
    fits: 'Teams that want an ongoing automation partner.',
    fromLabel: 'Monthly retainer',
    features: [
      'Priority support window',
      'Reliability monitoring',
      'Continuous improvements',
      'Quarterly roadmap reviews',
    ],
  },
];

export interface LeadMagnet {
  title: string;
  description: string;
  fileHint: string;
  ctaLabel: string;
}

export const LEAD_MAGNET: LeadMagnet = {
  title: 'AI Automation Audit Checklist',
  description:
    'A practical checklist to score which workflows to automate first, what data you need, and how to avoid demo-ware. Share your email and we will send it through.',
  fileHint: 'PDF checklist · 1 page',
  ctaLabel: 'Send me the checklist',
};
