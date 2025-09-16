import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Simular login - solo verifica que los campos no estén vacíos
  login(email: string, password: string): boolean {
    if (email.trim() !== '' && password.trim() !== '') {
      // Simular almacenamiento de sesión
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      return true;
    }
    return false;
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  // Obtener email del usuario
  getUserEmail(): string {
    return sessionStorage.getItem('userEmail') || '';
  }

  // Cerrar sesión
  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}