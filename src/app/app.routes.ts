import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login';
import { HomepageComponent } from '../app/components/homepage/homepage';
import { AuthGuard } from './guards/auth-guard';
import { LandingComponent } from './components/landing/landing';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { Register } from './components/register/register';


export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'forgot-password', component: ForgotPassword},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/landing' }
];




