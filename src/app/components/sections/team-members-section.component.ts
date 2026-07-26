import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TEAM_MEMBERS, TeamMember, memberInitials, memberPhotoAlt } from '../../data/members.data';

function shuffleMembers(items: TeamMember[]): TeamMember[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

let initialCarouselMembers: TeamMember[] | null = null;

function getInitialCarouselMembers(isBrowser: boolean): TeamMember[] {
  if (!isBrowser) {
    return TEAM_MEMBERS;
  }

  initialCarouselMembers ??= shuffleMembers(TEAM_MEMBERS);
  return initialCarouselMembers;
}

@Component({
  selector: 'app-team-members-section',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './team-members-section.component.html',
  styleUrl: './team-members-section.component.scss',
})
export class TeamMembersSectionComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly members = getInitialCarouselMembers(isPlatformBrowser(this.platformId));
  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);

  private readonly viewport = viewChild<ElementRef<HTMLElement>>('viewport');
  private embla?: EmblaCarouselType;
  private resizeObserver?: ResizeObserver;
  private resizeTimer?: ReturnType<typeof setTimeout>;

  initials(name: string): string {
    return memberInitials(name);
  }

  photoAlt(member: TeamMember): string {
    return memberPhotoAlt(member, 'carousel');
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    requestAnimationFrame(() => this.initEmbla());
  }

  ngOnDestroy(): void {
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
    this.resizeObserver?.disconnect();
    this.embla?.destroy();
  }

  scrollPrev(): void {
    this.embla?.scrollPrev();
  }

  scrollNext(): void {
    this.embla?.scrollNext();
  }

  trackMember(_index: number, member: TeamMember): string {
    return member.slug;
  }

  private initEmbla(): void {
    const node = this.viewport()?.nativeElement;
    if (!node) {
      return;
    }

    this.embla?.destroy();

    this.embla = EmblaCarousel(
      node,
      {
        loop: true,
        align: 'start',
        dragFree: true,
        containScroll: false,
        watchDrag: false,
      },
      [
        AutoScroll({
          speed: 0.75,
          startDelay: 400,
          direction: 'forward',
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          stopOnFocusIn: true,
        }),
      ],
    );

    const sync = (): void => {
      this.canScrollPrev.set(this.embla?.canScrollPrev() ?? false);
      this.canScrollNext.set(this.embla?.canScrollNext() ?? false);
    };

    this.embla.on('select', sync);
    this.embla.on('reInit', sync);
    sync();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver?.disconnect();
      this.resizeObserver = new ResizeObserver(() => {
        if (this.resizeTimer) {
          clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(() => this.embla?.reInit(), 150);
      });
      this.resizeObserver.observe(node);
    }
  }
}
