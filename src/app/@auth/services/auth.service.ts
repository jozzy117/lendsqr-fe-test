import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly isLoggedInKey = 'isLoggedIn';

  constructor(private router: Router) { }

  login(email: string, password: string): boolean {
    const validEmail = 'test@lendsqr.com';
    const validPassword = 'password123';

    if (email === validEmail && password === validPassword) {
      localStorage.setItem(this.isLoggedInKey, 'true');
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.isLoggedInKey);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';
  }
}
