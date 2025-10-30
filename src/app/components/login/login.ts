import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    @Inject(Router) private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    this.errorMessage = '';
    
    try {
      await this.authService.login(this.email, this.password);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goBack(): void {
    this.router.navigate(['/landing']);
  }

  forgotPassword(event: Event): void {
  event.preventDefault();
  this.router.navigate(['/forgot-password']);
}
}