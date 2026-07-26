import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ORGANIZATION } from '../../seo/site-seo.config';

@Component({
  selector: 'app-discovery-call-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './discovery-call-dialog.component.html',
  styleUrl: './discovery-call-dialog.component.scss',
})
export class DiscoveryCallDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly open = input(false);
  readonly memberName = input('');
  readonly memberSlug = input('');

  readonly closed = output<void>();
  readonly submitted = output<void>();

  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly submitSuccess = signal(false);

  protected readonly ORGANIZATION = ORGANIZATION;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    brief: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor() {
    effect(() => {
      if (!this.open()) {
        this.unlockScroll();
        return;
      }

      this.lockScroll();
      this.submitError.set(null);
      this.submitSuccess.set(false);
    });

    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        filter(() => this.open()),
        filter((event) => event.key === 'Escape'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.close());
  }

  close(): void {
    if (this.submitting()) {
      return;
    }

    this.closed.emit();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, brief } = this.form.getRawValue();
    const message = this.buildWhatsAppMessage(name, email, brief.trim());
    const whatsappUrl = `${ORGANIZATION.contactUrl}?text=${encodeURIComponent(message)}`;

    this.submitting.set(true);
    this.submitError.set(null);

    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!opened) {
      this.submitError.set('Unable to open WhatsApp. Please allow pop-ups and try again.');
      this.submitting.set(false);
      return;
    }

    this.submitSuccess.set(true);
    this.form.reset();
    this.submitted.emit();
    this.submitting.set(false);
  }

  private buildWhatsAppMessage(name: string, email: string, brief: string): string {
    const memberName = this.memberName();
    const memberSlug = this.memberSlug();
    const lines = [
      'Discovery call request',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Brief: ${brief}`,
    ];

    if (memberName) {
      lines.push('', `Referred from profile: ${memberName}${memberSlug ? ` (${memberSlug})` : ''}`);
    }

    return lines.join('\n');
  }

  showError(controlName: 'name' | 'email' | 'brief'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }

  private lockScroll(): void {
    this.document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    this.document.body.style.overflow = '';
  }
}
