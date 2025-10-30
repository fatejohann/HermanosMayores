import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth();
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(@Inject(Router) private router: Router) {
    // Observar cambios en el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/homepage']);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/homepage']);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }

  getUserEmail(): string {
    return this.auth.currentUser?.email || '';
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  private handleAuthError(error: any): Error {
    let message = 'Ha ocurrido un error de autenticación';
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'Este correo electrónico ya está registrado';
        break;
      case 'auth/invalid-email':
        message = 'El correo electrónico no es válido';
        break;
      case 'auth/operation-not-allowed':
        message = 'Operación no permitida';
        break;
      case 'auth/weak-password':
        message = 'La contraseña debe tener al menos 6 caracteres';
        break;
      case 'auth/user-disabled':
        message = 'Esta cuenta ha sido deshabilitada';
        break;
      case 'auth/user-not-found':
        message = 'No existe una cuenta con este correo electrónico';
        break;
      case 'auth/wrong-password':
        message = 'Contraseña incorrecta';
        break;
    }
    return new Error(message);
  }
}