export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Gbaski did not leave us with a demo chatbot. They shipped a Cognito-authenticated assistant with a real AWS action gateway, so rent and membership answers hit live account data safely.',
    name: 'Chidi Okonkwo',
    role: 'Head of Product',
    company: 'Rented123',
  },
  {
    quote:
      'Tai gave our publishing team a private ChatGPT-style workspace that actually fits the Quill pipeline. Draft quality and turnaround both improved within the first sprint.',
    name: 'Amelia Hart',
    role: 'Director of Content Operations',
    company: 'Tinglemore',
  },
  {
    quote:
      'Our event support load spiked every launch week. The n8n assistant now handles the repetitive ticketing and schedule questions so the team can focus on organisers who need a human.',
    name: 'Kemi Adeyemi',
    role: 'Operations Manager',
    company: 'Gbaski',
  },
  {
    quote:
      'We needed more than a Zap template. They treated n8n like infrastructure, documented the flows, and handed ownership back to us without lock-in.',
    name: 'Daniel Mensah',
    role: 'Founder',
    company: 'Sisi Safe',
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
