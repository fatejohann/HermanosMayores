import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login';
import { HomepageComponent } from '../app/components/homepage/homepage';
import { AuthGuard } from './guards/auth-guard';
import { LandingComponent } from './components/landing/landing';




export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/landing' }
];




