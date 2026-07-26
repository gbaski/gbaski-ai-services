import { Component, DestroyRef, OnDestroy, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideExternalLink } from '@lucide/angular';
import { DiscoveryCallDialogComponent } from '../../components/discovery-call-dialog/discovery-call-dialog.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import {
  TeamMember,
  buildMemberPersonJsonLd,
  getMemberBySlug,
  getProjectCollaborators,
  memberInitials,
  memberPageDescription,
  memberPhotoAbsoluteUrl,
  memberPhotoAlt,
} from '../../data/members.data';
import { ALL_PROJECTS } from '../../data/projects.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, LucideExternalLink, DiscoveryCallDialogComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly externalLinkIcon = LucideExternalLink;
  readonly projects = ALL_PROJECTS;
  readonly discoveryDialogOpen = signal(false);

  member?: TeamMember;

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.loadProfile(params.get('slug') ?? '');
    });
  }

  private loadProfile(slug: string): void {
    const member = getMemberBySlug(slug);

    if (!member) {
      void this.router.navigateByUrl('/');
      return;
    }

    this.member = member;

    const photoAlt = memberPhotoAlt(member, 'profile');
    this.seo.setPageMeta({
      title: `${member.name} | Gbaski AI Services`,
      description: memberPageDescription(member),
      path: `/profile/${member.slug}`,
      image: member.photo ? memberPhotoAbsoluteUrl(member.photo) : undefined,
      imageAlt: photoAlt,
    });
    this.seo.setJsonLd('json-ld-profile-person', buildMemberPersonJsonLd(member));

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('json-ld-profile-person');
  }

  photoAlt(member: TeamMember): string {
    return memberPhotoAlt(member, 'profile');
  }

  collaboratorPhotoAlt(member: TeamMember): string {
    return memberPhotoAlt(member, 'avatar');
  }

  initials(name: string): string {
    return memberInitials(name);
  }

  isCurrentMember(slug: string): boolean {
    return this.member?.slug === slug;
  }

  projectCollaborators(projectId: string): TeamMember[] {
    if (!this.member) {
      return [];
    }

    return getProjectCollaborators(projectId, this.member.slug);
  }

  projectSummary(project: (typeof ALL_PROJECTS)[number]): string {
    const firstLine = project.description.split('\n').find((line) => line.trim().length > 0);
    return firstLine?.trim() ?? project.description.trim();
  }

  openDiscoveryDialog(): void {
    this.discoveryDialogOpen.set(true);
  }

  closeDiscoveryDialog(): void {
    this.discoveryDialogOpen.set(false);
  }
}
