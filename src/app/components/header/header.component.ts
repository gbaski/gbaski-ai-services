import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideMenu, LucideMoon, LucideSun, LucideX } from '@lucide/angular';
import { PRIMARY_NAV } from '../../data/nav.data';
import { SmoothScrollService } from '../../services/smooth-scroll.service';
import { ThemeService } from '../../services/theme.service';
import { CALENDLY_URL } from '../../config/booking.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideMoon, LucideSun, LucideMenu, LucideX, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly smoothScroll = inject(SmoothScrollService);
  readonly themeService = inject(ThemeService);
  readonly nav = PRIMARY_NAV;
  readonly mobileOpen = signal(false);
  readonly openMenu = signal<string | null>(null);
  readonly calendlyUrl = CALENDLY_URL;

  goHome(event: Event): void {
    event.preventDefault();
    this.mobileOpen.set(false);
    if (this.router.url !== '/') {
      void this.router.navigateByUrl('/');
      return;
    }
    this.smoothScroll.scrollTo('#hero', { offset: 0 });
  }

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
    this.openMenu.set(null);
  }

  setMenu(label: string | null): void {
    this.openMenu.set(label);
  }

  bookCall(): void {
    if (typeof window !== 'undefined') {
      window.open(this.calendlyUrl, '_blank', 'noopener,noreferrer');
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMobile();
  }
}
