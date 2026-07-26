import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

interface N8nDemoElement extends HTMLElement {
  workflow: string;
  theme?: 'light' | 'dark';
}

@Component({
  selector: 'app-project-automation-flow',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './project-automation-flow.component.html',
  styleUrl: './project-automation-flow.component.scss',
})
export class ProjectAutomationFlowComponent implements AfterViewInit, OnDestroy {
  readonly automationFile = input.required<string>();
  readonly tool = input<string>('n8n');

  readonly themeService = inject(ThemeService);
  private readonly http = inject(HttpClient);
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly n8nDemoRef = viewChild<ElementRef<N8nDemoElement>>('n8nDemo');

  readonly loading = signal(false);
  readonly error = signal(false);
  readonly workflowJson = signal<string | null>(null);

  private static scriptLoadPromise?: Promise<void>;
  private themeEffect?: ReturnType<typeof effect>;
  private viewportObserver?: IntersectionObserver;
  private loadStarted = false;

  constructor() {
    this.themeEffect = effect(() => {
      const json = this.workflowJson();
      const demo = this.n8nDemoRef()?.nativeElement;
      const theme = this.themeService.theme();

      if (!json || !demo) {
        return;
      }

      demo.workflow = json;
      demo.theme = theme;
    });
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.viewportObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || this.loadStarted) {
          return;
        }

        this.loadStarted = true;
        this.viewportObserver?.disconnect();
        void this.loadWorkflow();
      },
      { rootMargin: '120px' },
    );

    this.viewportObserver.observe(this.hostRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.viewportObserver?.disconnect();
    this.themeEffect?.destroy();
  }

  private async loadWorkflow(): Promise<void> {
    this.loading.set(true);
    this.error.set(false);

    try {
      await this.ensureN8nDemoScript();
      const path = this.automationFile().replace(/ /g, '%20');
      const workflow = await firstValueFrom(this.http.get<Record<string, unknown>>(path));
      this.workflowJson.set(JSON.stringify(workflow));
    } catch {
      this.error.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  private ensureN8nDemoScript(): Promise<void> {
    if (typeof window === 'undefined') {
      return Promise.resolve();
    }

    if (customElements.get('n8n-demo')) {
      return Promise.resolve();
    }

    if (ProjectAutomationFlowComponent.scriptLoadPromise) {
      return ProjectAutomationFlowComponent.scriptLoadPromise;
    }

    ProjectAutomationFlowComponent.scriptLoadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-n8n-demo]') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'assets/vendor/n8n-demo.bundled.js';
      script.type = 'module';
      script.dataset['n8nDemo'] = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load n8n demo component'));
      document.head.appendChild(script);
    });

    return ProjectAutomationFlowComponent.scriptLoadPromise;
  }
}
