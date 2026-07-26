import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LEAD_MAGNET } from '../../data/social-proof.data';
import { ORGANIZATION } from '../../seo/site-seo.config';

@Component({
  selector: 'app-lead-magnet',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section id="audit-checklist" class="lead-magnet theme-section px-6 py-20 md:px-10 lg:px-14">
      <div class="lead-magnet__panel theme-bg-elevated mx-auto max-w-[1400px]">
        <div class="lead-magnet__copy">
          <p class="section-eyebrow mb-3">Lead magnet</p>
          <h2 class="section-heading">{{ magnet.title }}</h2>
          <p class="section-body mt-4">{{ magnet.description }}</p>
          <p class="lead-magnet__hint font-mono-label">{{ magnet.fileHint }}</p>
        </div>
        @if (submitted()) {
          <p class="lead-magnet__success">
            Thanks, WhatsApp is opening with your request. Send the message to receive the checklist.
          </p>
        } @else {
          <form class="lead-magnet__form" [formGroup]="form" (ngSubmit)="submit()">
            <label>
              <span class="font-mono-label">Work email</span>
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
      padding: 1.75rem;
      border-radius: 1.25rem;
      border: 1px solid var(--theme-border-subtle);
    }
    @media (min-width: 800px) {
      .lead-magnet__panel {
        grid-template-columns: 1.4fr 1fr;
        align-items: end;
      }
    }
    .lead-magnet__hint {
      margin-top: 1rem;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--theme-text-secondary);
    }
    .lead-magnet__form {
      display: grid;
      gap: 0.75rem;
    }
    .lead-magnet__form label {
      display: grid;
      gap: 0.4rem;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--theme-text-secondary);
    }
    .lead-magnet__form input {
      border: 1px solid var(--theme-border-subtle);
      background: var(--theme-bg);
      color: var(--theme-text);
      border-radius: 0.75rem;
      padding: 0.75rem 0.9rem;
      font-size: 0.95rem;
    }
    .lead-magnet__success {
      color: var(--theme-text-soft);
      line-height: 1.6;
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
