import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

const FOOTER_LINKS = [
  { label: 'Services', href: '#services', route: false },
  { label: 'How we work', href: '#how-we-work', route: false },
  { label: 'Projects', href: '#projects', route: false },
  { label: 'FAQ', href: '#faq', route: false },
];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly router = inject(Router);
  readonly links = FOOTER_LINKS;
  readonly year = new Date().getFullYear();

  scrollTo(event: Event, target: string): void {
    event.preventDefault();
    if (this.router.url !== '/') {
      void this.router.navigate(['/'], { fragment: target.replace('#', '') });
      return;
    }
    this.smoothScroll.scrollTo(target, { offset: -20 });
  }
}
