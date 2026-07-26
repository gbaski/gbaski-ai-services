import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly delay = input(0, { alias: 'appScrollRevealDelay' });

  private observer?: IntersectionObserver;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('scroll-reveal');
    element.style.transitionDelay = `${this.delay()}ms`;

    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      element.classList.add('scroll-reveal--visible');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('scroll-reveal--visible');
          this.observer?.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
