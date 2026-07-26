import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideMoon, LucideSun } from '@lucide/angular';
import { SmoothScrollService } from '../../services/smooth-scroll.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideMoon, LucideSun],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly smoothScroll = inject(SmoothScrollService);
  readonly themeService = inject(ThemeService);

  goHome(event: Event): void {
    event.preventDefault();

    if (this.router.url !== '/') {
      void this.router.navigateByUrl('/');
      return;
    }

    this.smoothScroll.scrollTo('#hero', { offset: 0 });
  }
}
