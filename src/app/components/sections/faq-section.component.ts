import { Component, signal } from '@angular/core';
import { FAQS } from '../../data/faq.data';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss',
})
export class FaqSectionComponent {
  readonly faqs = FAQS;
  readonly openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.set(this.openIndex() === index ? null : index);
  }
}
