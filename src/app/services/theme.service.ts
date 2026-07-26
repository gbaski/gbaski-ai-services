import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'gbaski-theme';
  readonly theme = signal<Theme>('dark');

  init(): void {
    if (typeof document === 'undefined') return;

    const stored = localStorage.getItem(this.storageKey);
    const theme: Theme = stored === 'light' ? 'light' : 'dark';
    this.apply(theme);

    requestAnimationFrame(() => {
      document.documentElement.classList.add('theme-transitions');
    });
  }

  toggle(): void {
    document.documentElement.classList.add('theme-transitions');
    const next: Theme = this.theme() === 'light' ? 'dark' : 'light';
    this.apply(next);
    localStorage.setItem(this.storageKey, next);
  }

  private apply(theme: Theme): void {
    this.theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
