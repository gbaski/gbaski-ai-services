import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VoiceWidgetService {
  readonly launcherVisible = signal(false);
  readonly widgetOpen = signal(false);

  revealLauncher(): void {
    this.launcherVisible.set(true);
  }

  openWidget(): void {
    this.launcherVisible.set(true);
    if (this.widgetOpen()) {
      return;
    }

    this.widgetOpen.set(true);
  }

  closeWidget(): void {
    this.widgetOpen.set(false);
  }
}
