import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly isLoggedInKey = 'isLoggedIn';

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
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';
  }
}
