import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {
    // Verifica se já estava logado
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  login(email: string, pass: string): boolean {
    // Mock de validação
    if (email === 'admin@admin.com' && pass === '123456') {
      this.isAuthenticated = true;
      localStorage.setItem('token', 'mock-token-xyz');
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
