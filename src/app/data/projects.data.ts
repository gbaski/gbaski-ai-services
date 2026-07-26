export type ProjectCategory = 'chat-integration' | 'ai-automation';

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  description: string;
  images: ProjectImage[];
  productionUrl: string;
  clientName: string;
  automationTool?: 'n8n';
  automationFile?: string;
}

export interface ProjectCategoryGroup {
  id: ProjectCategory;
  label: string;
  summary: string;
  projects: Project[];
}

export const PROJECTS_PAGE_INTRO =
  'Selected AI services projects from our portfolio: chat integrations, voice assistants, and workflow automation built for real users and shipped to production.';

export const PROJECT_CATEGORY_GROUPS: ProjectCategoryGroup[] = [
  {
    id: 'chat-integration',
    label: 'Chat Integration',
    summary: 'Conversational assistants wired into existing products, auth, and data layers.',
    projects: [
      {
        id: 'rented123-ai-assistant',
        category: 'chat-integration',
        title: 'Rented123 AI Assistant & Action Gateway',
        description: `Built a secure AI-powered assistant for Rented123, enabling authenticated users to access rent reporting, membership, verification, and document information through natural language conversations.

Key Contributions
• Developed an AI Actions Gateway using Golang, GoFiber, AWS Lambda, and API Gateway.
• Integrated Chatbase with AWS Cognito for secure user authentication and identification.
• Implemented JWT-based identity federation and Cognito token validation using JWKS and RS256.
• Built protected AI action endpoints for rent reporting, membership status, verification status, and document summaries.
• Integrated DynamoDB-backed user data retrieval into AI workflows.

Tech Stack
Golang, GoFiber, AWS Lambda, API Gateway, AWS Cognito, DynamoDB, JWT, Chatbase, JavaScript.

Outcome
Delivered a secure, serverless AI assistant that provides personalized account insights while leveraging existing user authentication and dashboard infrastructure.`,
        images: [
          { src: '/assets/projects/rented123-img3.png', alt: 'Rented123 signed-in assistant with rent reporting summary' },
          { src: '/assets/projects/rented123-img1.png', alt: 'Rented123 chat conversation with rent reporting data' },
          {
            src: '/assets/projects/rented123-chatbase-integration-flow.png',
            alt: 'Rented123 Chatbase integration architecture',
          },
        ],
        productionUrl: 'https://rented123.com',
        clientName: 'Rented123',
      },
      {
        id: 'tai-librechat',
        category: 'chat-integration',
        title: 'Tai (LibreChat) Internal AI Platform Deployment',
        description: `Deployed and configured Tai, an internal AI platform built on LibreChat, as an in-house replica of ChatGPT. Used Tai to support content generation workflows, evaluate Quill-compatible outputs, and streamline the process of translating product requirements into structured, editable content within the Quill/SSGD publishing pipeline.`,
        images: [
          { src: '/assets/projects/tinglemore-img0.png', alt: 'Tai LibreChat workspace overview' },
          { src: '/assets/projects/tinglemore-img1.png', alt: 'Tai content generation session' },
          { src: '/assets/projects/tinglemore-img3.png', alt: 'Tai Quill-compatible output review' },
        ],
        productionUrl: 'https://tai.tinglemore.ca',
        clientName: 'Tinglemore',
      },
    ],
  },
  {
    id: 'ai-automation',
    label: 'AI Automation',
    summary: 'Workflow-driven assistants and automations orchestrated for speed, scale, and reliability.',
    projects: [
      {
        id: 'gbaski-ai-chat',
        category: 'ai-automation',
        title: 'Gbaski AI Chat Assistant',
        description: `Chatbot to assist event organizers and participants with information about Gbaski, its features, events, ticketing, registrations, engagement activities, and promotions.`,
        images: [],
        productionUrl: 'https://gbaski.app',
        clientName: 'Gbaski',
        automationTool: 'n8n',
        automationFile: '/assets/projects/Gbaski AI Chat Assistant.json',
      },
      {
        id: 'sisi-safe-calculator',
        category: 'ai-automation',
        title: 'Sisi Safe calculator',
        description: `Sisi Safe AI helps women and couples identify safer periods for unprotected sex without contraceptives by providing personalized fertility and cycle guidance.`,
        images: [],
        productionUrl: 'https://sisi-safe-zone.lovable.app',
        clientName: 'Sisi Safe',
        automationTool: 'n8n',
        automationFile: '/assets/projects/Safe Sex Calculator.json',
      },
    ],
  },
];

export const ALL_PROJECTS: Project[] = PROJECT_CATEGORY_GROUPS.flatMap((group) => group.projects);
