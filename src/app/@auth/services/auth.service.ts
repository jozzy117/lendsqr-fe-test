import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;

  login(email: string, password: string): boolean {
    const validEmail = 'test@lendsqr.com';
    const validPassword = 'password123';

    if (email === validEmail && password === validPassword) {
      this.isLoggedIn = true;
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
