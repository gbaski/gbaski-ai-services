import { Component } from '@angular/core';
import {
  LogoMarqueeRowComponent,
  MarqueeLogo,
} from '../logo-marquee-row/logo-marquee-row.component';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { INTEGRATION_PLATFORMS_SEO_LINE } from '../../seo/site-seo.config';

const ROW_ONE: MarqueeLogo[] = [
  { name: 'n8n', logo: '/assets/integrations/n8n.svg' },
  { name: 'Make', logo: '/assets/integrations/make.svg' },
  { name: 'Zapier', logo: '/assets/integrations/zapier.svg' },
  { name: 'WhatsApp', logo: '/assets/integrations/whatsapp.svg' },
  { name: 'Slack', logo: '/assets/integrations/slack.svg' },
  { name: 'AWS', logo: '/assets/integrations/aws.svg' },
];

const ROW_TWO: MarqueeLogo[] = [
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
  imports: [ScrollRevealDirective, LogoMarqueeRowComponent],
  templateUrl: './integrations-section.component.html',
  styleUrl: './integrations-section.component.scss',
})
export class IntegrationsSectionComponent {
  readonly integrationPlatforms = INTEGRATION_PLATFORMS_SEO_LINE;
  readonly rowOne = ROW_ONE;
  readonly rowTwo = ROW_TWO;
}
