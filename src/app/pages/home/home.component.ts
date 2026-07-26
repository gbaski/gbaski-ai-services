import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { allTeamMembersWithPhotos, buildTeamMembersItemListJsonLd } from '../../data/members.data';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { AiServicesSectionComponent } from '../../components/sections/ai-services-section.component';
import { VoiceConsultantSectionComponent } from '../../components/sections/voice-consultant-section.component';
import { HowWeWorkSectionComponent } from '../../components/sections/how-we-work-section.component';
import { TeamMembersSectionComponent } from '../../components/sections/team-members-section.component';
import { ProjectsSectionComponent } from '../../components/sections/projects-section.component';
import { IntegrationsSectionComponent } from '../../components/sections/integrations-section.component';
import { FaqSectionComponent } from '../../components/sections/faq-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    AiServicesSectionComponent,
    VoiceConsultantSectionComponent,
    HowWeWorkSectionComponent,
    TeamMembersSectionComponent,
    ProjectsSectionComponent,
    IntegrationsSectionComponent,
    FaqSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setHomePageSeo();
    this.seo.setJsonLd(
      'json-ld-team-members',
      buildTeamMembersItemListJsonLd(allTeamMembersWithPhotos()),
    );
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('json-ld-team-members');
  }
}
