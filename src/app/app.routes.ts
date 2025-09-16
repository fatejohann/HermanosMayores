import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login';
import { HomepageComponent } from '../app/components/homepage/homepage';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: '**', redirectTo: '/login' }
];