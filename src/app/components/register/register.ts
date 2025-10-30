import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    @Inject(Router) private router: Router
  ) {}

  togglePasswordVisibility1(): void {
    this.showPassword1 = !this.showPassword1;
  }

  togglePasswordVisibility2(): void {
    this.showPassword2 = !this.showPassword2;
  }

  async onRegister(): Promise<void> {
    this.errorMessage = '';
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }
    
    try {
      await this.authService.register(this.email, this.password);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}