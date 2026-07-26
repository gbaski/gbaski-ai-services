import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { INTEGRATION_PLATFORMS_SEO_LINE } from '../../seo/site-seo.config';

export interface IntegrationLogo {
  name: string;
  logo: string;
}

const INTEGRATION_LOGOS: IntegrationLogo[] = [
  { name: 'n8n', logo: '/assets/integrations/n8n.svg' },
  { name: 'Make', logo: '/assets/integrations/make.svg' },
  { name: 'Zapier', logo: '/assets/integrations/zapier.svg' },
  { name: 'WhatsApp', logo: '/assets/integrations/whatsapp.svg' },
  { name: 'Slack', logo: '/assets/integrations/slack.svg' },
  { name: 'AWS', logo: '/assets/integrations/aws.svg' },
  { name: 'YouTube', logo: '/assets/integrations/youtube.svg' },
  { name: 'Google', logo: '/assets/integrations/google.svg' },
  { name: 'TikTok', logo: '/assets/integrations/tiktok.svg' },
  { name: 'Shopify', logo: '/assets/integrations/shopify.svg' },
  { name: 'GitHub', logo: '/assets/integrations/github.svg' },
  { name: 'Docker', logo: '/assets/integrations/docker.svg' },
];

@Component({
  selector: 'app-integrations-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './integrations-section.component.html',
  styleUrl: './integrations-section.component.scss',
})
export class IntegrationsSectionComponent {
  readonly integrationPlatforms = INTEGRATION_PLATFORMS_SEO_LINE;
  readonly logos = INTEGRATION_LOGOS;
}
