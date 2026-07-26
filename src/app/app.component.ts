import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SmoothScrollService } from './services/smooth-scroll.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly theme = inject(ThemeService);

  ngOnInit(): void {
    this.theme.init();
    this.smoothScroll.init();
  }

  ngOnDestroy(): void {
    this.smoothScroll.ngOnDestroy();
  }
}
