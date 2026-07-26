import { Injectable, NgZone, OnDestroy } from '@angular/core';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class SmoothScrollService implements OnDestroy {
  private lenis?: Lenis;
  private rafId = 0;
  private scrollCallbacks = new Set<(scroll: number) => void>();
  private scrollTriggerReady = false;

  constructor(private readonly ngZone: NgZone) {}

  init(): void {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    if (this.lenis) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.lenis = new Lenis({
      duration: 0.7,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    document.documentElement.classList.add('lenis', 'lenis-smooth');

    this.lenis.on('scroll', () => {
      if (this.scrollTriggerReady) {
        ScrollTrigger.update();
      }
    });

    this.ngZone.runOutsideAngular(() => {
      const raf = (time: number) => {
        this.lenis?.raf(time);
        const scroll = this.lenis?.scroll ?? 0;
        this.scrollCallbacks.forEach((cb) => cb(scroll));
        this.rafId = requestAnimationFrame(raf);
      };
      this.rafId = requestAnimationFrame(raf);
    });
  }

  initScrollTrigger(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.scrollTriggerReady) {
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    this.scrollTriggerReady = true;
    ScrollTrigger.refresh();
  }

  getLenis(): Lenis | undefined {
    return this.lenis;
  }

  onScroll(callback: (scroll: number) => void): () => void {
    this.scrollCallbacks.add(callback);
    return () => this.scrollCallbacks.delete(callback);
  }

  scrollTo(target: string | number | HTMLElement, options?: { offset?: number }): void {
    this.lenis?.scrollTo(target, { offset: options?.offset ?? 0 });
  }

  ngOnDestroy(): void {
    if (typeof document === 'undefined') {
      return;
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    ScrollTrigger.getAll().forEach((t) => t.kill());
    this.lenis?.destroy();
    this.lenis = undefined;
    document.documentElement.classList.remove('lenis', 'lenis-smooth');
    this.scrollCallbacks.clear();
    this.scrollTriggerReady = false;
  }
}
