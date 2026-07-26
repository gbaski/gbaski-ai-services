import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  input,
  viewChild,
} from '@angular/core';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import type { LightGallery } from 'lightgallery/lightgallery';
import type { ProjectImage } from '../../data/projects.data';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  templateUrl: './project-gallery.component.html',
  styleUrl: './project-gallery.component.scss',
})
export class ProjectGalleryComponent implements AfterViewInit, OnDestroy {
  readonly images = input.required<ProjectImage[]>();
  readonly galleryId = input.required<string>();

  private readonly galleryRoot = viewChild<ElementRef<HTMLElement>>('galleryRoot');
  private galleryInstance?: LightGallery;

  constructor(private readonly ngZone: NgZone) {}

  ngAfterViewInit(): void {
    const root = this.galleryRoot()?.nativeElement;
    if (!root || typeof window === 'undefined') {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.galleryInstance = lightGallery(root, {
        plugins: [lgThumbnail, lgZoom],
        selector: 'a.project-gallery__item',
        speed: 450,
        download: false,
        counter: true,
        zoomFromOrigin: true,
        mobileSettings: {
          controls: true,
          showCloseIcon: true,
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.galleryInstance?.destroy();
    this.galleryInstance = undefined;
  }
}
