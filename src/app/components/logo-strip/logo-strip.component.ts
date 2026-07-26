import { Component } from '@angular/core';

interface ClientLogo {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-logo-strip',
  standalone: true,
  templateUrl: './logo-strip.component.html',
  styleUrl: './logo-strip.component.scss',
})
export class LogoStripComponent {
  readonly clients: ClientLogo[] = [
    { name: 'Rented123', logo: '/assets/clients/rented123.png' },
    { name: 'Tinglemore', logo: '/assets/clients/tinglemore.png' },
    { name: 'Gbaski', logo: '/assets/clients/gbaski.png' },
  ];
}
