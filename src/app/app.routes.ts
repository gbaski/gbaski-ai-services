import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile/:slug', component: ProfileComponent },
  { path: 'projects', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
