import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  viewChild,
} from '@angular/core';
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';

interface ClientLogo {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-logo-strip',
  standalone: true,
  templateUrl: './logo-strip.component.html',
  styleUrl: './logo-strip.component.scss',
})
export class LogoStripComponent implements AfterViewInit, OnDestroy {
  readonly clients: ClientLogo[] = [
    { name: 'Rented123', logo: '/assets/clients/rented123.png' },
    { name: 'Tinglemore', logo: '/assets/clients/tinglemore.png' },
    { name: 'Gbaski', logo: '/assets/clients/gbaski.png' },
  ];

  private readonly viewport = viewChild<ElementRef<HTMLElement>>('viewport');
  private embla?: EmblaCarouselType;

  loopedClients(): ClientLogo[] {
    return [...this.clients, ...this.clients, ...this.clients];
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const node = this.viewport()?.nativeElement;
    if (!node) return;

    this.embla = EmblaCarousel(
      node,
      {
        loop: true,
        dragFree: true,
        containScroll: false,
        watchDrag: false,
      },
      [
        AutoScroll({
          speed: 0.55,
          startDelay: 0,
          direction: 'backward',
          stopOnInteraction: false,
          stopOnMouseEnter: false,
          stopOnFocusIn: false,
        }),
      ],
    );
  }

  ngOnDestroy(): void {
    this.embla?.destroy();
  }
}
