import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FOOTER_NAV } from '../../data/nav.data';
import { ORGANIZATION } from '../../seo/site-seo.config';
import { CALENDLY_URL } from '../../config/booking.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly nav = FOOTER_NAV;
  readonly year = new Date().getFullYear();
  readonly email = ORGANIZATION.email;
  readonly whatsapp = ORGANIZATION.contactUrl;
  readonly calendly = CALENDLY_URL;
}
