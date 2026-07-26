import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  input,
  viewChild,
} from '@angular/core';
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';

export interface MarqueeLogo {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-logo-marquee-row',
  standalone: true,
  templateUrl: './logo-marquee-row.component.html',
  styleUrl: './logo-marquee-row.component.scss',
})
export class LogoMarqueeRowComponent implements AfterViewInit, OnDestroy {
  readonly logos = input.required<MarqueeLogo[]>();
  readonly direction = input<'left' | 'right'>('right');
  readonly speed = input(0.65);
  /** 0–1 offset into the loop for staggered row alignment */
  readonly phase = input(0);

  private readonly viewport = viewChild<ElementRef<HTMLElement>>('viewport');
  private embla?: EmblaCarouselType;
  private resizeObserver?: ResizeObserver;
  private resizeTimer?: ReturnType<typeof setTimeout>;

  loopedLogos(): Array<MarqueeLogo & { key: string; isClone: boolean }> {
    const items = this.logos();
    const copies = 3;

    return Array.from({ length: copies }, (_, copy) =>
      items.map((item) => ({
        ...item,
        key: `${item.name}-${copy}`,
        isClone: copy > 0,
      })),
    ).flat();
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

  private initEmbla(): void {
    const node = this.viewport()?.nativeElement;
    if (!node) {
      return;
    }

    this.embla?.destroy();

    const items = this.logos();
    const autoScrollDirection = this.direction() === 'right' ? 'backward' : 'forward';

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
          speed: this.speed(),
          startDelay: 0,
          direction: autoScrollDirection,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
          stopOnFocusIn: false,
        }),
      ],
    );

    if (items.length > 0) {
      const phaseOffset = Math.round(items.length * this.phase());
      const startIndex = items.length + phaseOffset;
      this.embla.scrollTo(startIndex, false);
    }

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
