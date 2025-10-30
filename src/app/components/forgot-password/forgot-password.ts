import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword {
  email: string = '';
  message: string = '';

  constructor(@Inject(Router) private router: Router) {}

  onRecover(): void {
    if (!this.email) {
      this.message = 'Por favor, ingresa tu correo electrónico';
      return;
    }
    // Aquí iría la lógica real de recuperación
    this.message = 'Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña.';
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}