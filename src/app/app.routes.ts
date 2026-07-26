import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundPageComponent } from './pages/about/about-contact-pages.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile/:slug', component: ProfileComponent },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/service/services-hub.component').then((m) => m.ServicesHubComponent),
  },
  {
    path: 'services/:slug',
    loadComponent: () =>
      import('./pages/service/service-page.component').then((m) => m.ServicePageComponent),
  },
  {
    path: 'industries',
    loadComponent: () =>
      import('./pages/industry/industry-pages.component').then((m) => m.IndustriesHubComponent),
  },
  {
    path: 'industries/:slug',
    loadComponent: () =>
      import('./pages/industry/industry-pages.component').then((m) => m.IndustryPageComponent),
  },
  {
    path: 'locations',
    loadComponent: () =>
      import('./pages/location/location-pages.component').then((m) => m.LocationsHubComponent),
  },
  {
    path: 'locations/:slug',
    loadComponent: () =>
      import('./pages/location/location-pages.component').then((m) => m.LocationPageComponent),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog-pages.component').then((m) => m.BlogHubComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog-pages.component').then((m) => m.BlogPostComponent),
  },
  {
    path: 'case-studies',
    loadComponent: () =>
      import('./pages/case-study/case-study-pages.component').then((m) => m.CaseStudiesHubComponent),
  },
  {
    path: 'case-studies/:slug',
    loadComponent: () =>
      import('./pages/case-study/case-study-pages.component').then((m) => m.CaseStudyPageComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about-contact-pages.component').then((m) => m.AboutPageComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/about/about-contact-pages.component').then((m) => m.ContactPageComponent),
  },
  {
    path: 'resources',
    loadComponent: () =>
      import('./pages/about/about-contact-pages.component').then((m) => m.ResourcesPageComponent),
  },
  { path: 'projects', redirectTo: 'case-studies', pathMatch: 'full' },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
