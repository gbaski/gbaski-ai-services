export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'Do you provide AI services in Nigeria?',
    answer:
      'Yes. Gbaski AI Services provides AI services in Nigeria for businesses nationwide, from Lagos and Abuja to Port Harcourt, Ibadan, and beyond. We deliver automation, chatbots, voice assistants, and custom AI agents built for production.',
  },
  {
    question: 'What AI services do you offer?',
    answer:
      'We build workflow automation, AI-powered customer support assistants, voice agents, internal knowledge assistants, and CRM or business-system integrations, designed for production, not demos.',
  },
  {
    question: 'How much does an AI automation project cost?',
    answer:
      'Scoped projects often start from a few thousand dollars for focused automations, with larger builds priced after discovery. We provide clear estimates upfront based on workflows, integrations, and delivery timeline.',
  },
  {
    question: 'How long does implementation take?',
    answer:
      'Timelines depend on scope and complexity. Most focused AI deployments are completed within four to eight weeks; larger multi-system rollouts are phased with milestones you can track.',
  },
  {
    question: 'How do we get started with AI?',
    answer:
      'We begin with a discovery session to understand your objectives, workflows, and infrastructure. From there, we propose a roadmap with clear deliverables and measurable outcomes.',
  },
  {
    question: 'Can you integrate with our existing software stack?',
    answer:
      'Yes. We connect AI and automation to CRMs, databases, messaging platforms, cloud services, and internal APIs, including n8n, Make, Zapier, WhatsApp, AWS, and the tools your team already uses.',
  },
  {
    question: 'Do you build custom systems or use templates?',
    answer:
      'Both, with intent. We use proven patterns where they fit, then design custom workflows, agents, and integrations around your processes, data, and business rules, not one-size-fits-all templates for core logic.',
  },
  {
    question: 'Who owns the AI workflows and data?',
    answer:
      'You do. Workflows, configurations, prompts, and customer data remain your property. We document handoff clearly and can transfer n8n instances, repositories, and cloud resources to your accounts.',
  },
  {
    question: 'How secure are your AI integrations?',
    answer:
      'Security is built in from the start. We use least-privilege access, encrypted connections, environment isolation, and secure handling of API keys and customer data, aligned with production best practices.',
  },
  {
    question: 'Do you offer ongoing support and maintenance?',
    answer:
      'Yes. We offer post-launch support, monitoring, workflow updates, and iterative improvements so your automations stay reliable as your business and tools change.',
  },
  {
    question: 'Who do you work with?',
    answer:
      'We partner with startups, SMEs, and enterprises in Nigeria and worldwide, across technology, finance, retail, health, and operations-focused teams that need AI shipped to production.',
  },
];
