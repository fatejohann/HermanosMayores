import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Simular login - solo verifica que los campos no estén vacíos
  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      return true;
    }
    return false;
  }

    register(email: string, password: string): boolean {
    if (email.trim() !== '' && password.trim() !== '') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      // Verifica si el usuario ya existe
      if (users.find((u: any) => u.email === email)) {
        return false;
      }
      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
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