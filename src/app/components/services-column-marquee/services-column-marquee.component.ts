import { Component } from '@angular/core';

export interface ServiceMarqueeItem {
  label: string;
  icon: string;
}

export interface ServiceMarqueeRow {
  id: string;
  direction: 'left' | 'right';
  duration: number;
  items: ServiceMarqueeItem[];
}

@Component({
  selector: 'app-services-column-marquee',
  standalone: true,
  templateUrl: './services-column-marquee.component.html',
  styleUrl: './services-column-marquee.component.scss',
})
export class ServicesColumnMarqueeComponent {
  readonly rows: ServiceMarqueeRow[] = [
    {
      id: 'row-a',
      direction: 'left',
      duration: 42,
      items: [
        { label: 'Workflow automation', icon: 'account_tree' },
        { label: 'Process optimization', icon: 'tune' },
        { label: 'Intelligent routing', icon: 'route' },
        { label: 'Chatbot integration', icon: 'smart_toy' },
        { label: 'Enterprise integration', icon: 'hub' },
        { label: 'Voice AI assistants', icon: 'mic' },
      ],
    },
    {
      id: 'row-b',
      direction: 'right',
      duration: 48,
      items: [
        { label: 'RPA solutions', icon: 'precision_manufacturing' },
        { label: 'Predictive analytics', icon: 'insights' },
        { label: 'AI orchestration', icon: 'auto_awesome' },
        { label: 'Data synchronization', icon: 'sync' },
        { label: 'CRM integration', icon: 'contacts' },
        { label: 'Lead scoring', icon: 'leaderboard' },
      ],
    },
    {
      id: 'row-c',
      direction: 'left',
      duration: 44,
      items: [
        { label: 'AI assistants', icon: 'support_agent' },
        { label: 'Model deployment', icon: 'deployed_code' },
        { label: 'Knowledge retrieval', icon: 'menu_book' },
        { label: 'Modernization', icon: 'upgrade' },
        { label: 'Automation pipelines', icon: 'linear_scale' },
        { label: 'API integrations', icon: 'api' },
      ],
    },
    {
      id: 'row-d',
      direction: 'right',
      duration: 46,
      items: [
        { label: 'Custom AI agents', icon: 'psychology' },
        { label: 'WhatsApp automation', icon: 'chat' },
        { label: 'Document processing', icon: 'description' },
        { label: 'Sales enablement', icon: 'trending_up' },
        { label: 'Cloud infrastructure', icon: 'cloud' },
        { label: 'n8n workflows', icon: 'device_hub' },
      ],
    },
    {
      id: 'row-e',
      direction: 'left',
      duration: 50,
      items: [
        { label: 'Customer engagement', icon: 'groups' },
        { label: 'Internal ops tools', icon: 'build' },
        { label: 'Support triage', icon: 'support' },
        { label: 'Lead qualification', icon: 'filter_alt' },
        { label: 'Multi-channel bots', icon: 'forum' },
        { label: 'Production AI systems', icon: 'verified' },
      ],
    },
  ];

  trackItems(row: ServiceMarqueeRow): Array<ServiceMarqueeItem & { key: string }> {
    const doubled = [...row.items, ...row.items];
    return doubled.map((item, index) => ({
      ...item,
      key: `${row.id}-${index}`,
    }));
  }
}
