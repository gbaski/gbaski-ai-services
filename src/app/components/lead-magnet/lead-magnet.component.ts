import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LEAD_MAGNET } from '../../data/social-proof.data';
import { ORGANIZATION } from '../../seo/site-seo.config';

@Component({
  selector: 'app-lead-magnet',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section id="audit-checklist" class="lead-magnet theme-section px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div class="lead-magnet__panel theme-bg-elevated mx-auto max-w-[1200px]">
        <div class="lead-magnet__copy">
          <p class="section-eyebrow mb-3">Resource</p>
          <h2 class="section-heading">{{ magnet.title }}</h2>
          <p class="section-body mt-4">{{ magnet.description }}</p>
          <p class="lead-magnet__hint">{{ magnet.fileHint }}</p>
        </div>
        @if (submitted()) {
          <p class="lead-magnet__success">
            Thanks. WhatsApp is opening with your request. Send the message to receive the checklist.
          </p>
        } @else {
          <form class="lead-magnet__form" [formGroup]="form" (ngSubmit)="submit()">
            <label>
              <span>Work email</span>
              <input type="email" formControlName="email" placeholder="you@company.com" autocomplete="email" />
            </label>
            <button type="submit" class="btn-pill btn-pill--primary" [disabled]="form.invalid">
              {{ magnet.ctaLabel }}
            </button>
          </form>
        }
      </div>
    </section>
  `,
  styles: `
    .lead-magnet__panel {
      display: grid;
      gap: 1.5rem;
      padding: 2rem;
      border-radius: 0.75rem;
      border: 1px solid var(--theme-border);
      box-shadow: var(--theme-shadow-soft);
    }
    @media (min-width: 800px) {
      .lead-magnet__panel {
        grid-template-columns: 1.4fr 1fr;
        align-items: end;
      }
    }
    .lead-magnet__hint {
      margin-top: 1rem;
      font-size: 0.875rem;
      color: var(--theme-muted-soft);
    }
    .lead-magnet__form {
      display: grid;
      gap: 0.75rem;
    }
    .lead-magnet__form label {
      display: grid;
      gap: 0.4rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--theme-muted);
    }
    .lead-magnet__form input {
      min-height: 44px;
      border: 1px solid var(--theme-border);
      background: var(--theme-bg);
      color: var(--theme-fg);
      border-radius: 0.5rem;
      padding: 0.75rem 0.9rem;
      font-size: 1rem;
    }
    .lead-magnet__form input:focus-visible {
      outline: 2px solid var(--theme-accent);
      outline-offset: 2px;
    }
    .lead-magnet__success {
      color: var(--theme-fg-soft);
      line-height: 1.65;
      margin: 0;
    }
  `,
})
export class LeadMagnetComponent {
  private readonly fb = inject(FormBuilder);
  readonly magnet = LEAD_MAGNET;
  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const email = this.form.controls.email.value;
    const message = `AI Automation Audit Checklist request%0AEmail: ${encodeURIComponent(email)}`;
    this.submitted.set(true);
    if (typeof window !== 'undefined') {
      window.open(`${ORGANIZATION.contactUrl}?text=${message}`, '_blank', 'noopener,noreferrer');
    }
  }
}
