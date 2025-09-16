import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';
    
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/homepage']);
    } else {
      this.errorMessage = 'Por favor, completa todos los campos';
    }
  }

  goToRegister(): void {
    // Por ahora solo mostrar mensaje, después puedes implementar el registro
    alert('Función de registro pendiente de implementar');
  }

  forgotPassword(): void {
    // Por ahora solo mostrar mensaje, después puedes implementar recuperación
    alert('Función de recuperación de contraseña pendiente de implementar');
  }
}