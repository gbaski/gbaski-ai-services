import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-voice-consultant-callbar',
  standalone: true,
  templateUrl: './voice-consultant-callbar.component.html',
  styleUrl: './voice-consultant-callbar.component.scss',
})
export class VoiceConsultantCallbarComponent {
  readonly label = input('Talk to Our AI Consultant');
  readonly disabled = input(false);
  readonly clicked = output<void>();
}
