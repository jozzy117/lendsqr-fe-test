import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  public emailError: string | null = null;
  public passwordError: string | null = null;
  public loginError: string | null = null;
  public passwordVisible: boolean = false;

  constructor(private router: Router, private authService: AuthService,) { }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  login() {
    this.emailError = null;
    this.passwordError = null;
    this.loginError = null;

    if (!this.email) {
      this.emailError = 'Email is required';
    } else if (!this.validateEmail(this.email)) {
      this.emailError = 'Invalid email format';
    }

    if (!this.password) {
      this.passwordError = 'Password is required';
    }

    if (!this.emailError && !this.passwordError) {
      const isAuthenticated = this.authService.login(this.email, this.password);

      if (isAuthenticated) {
        this.router.navigate(['/lendsqr/users']);
      } else {
        this.loginError = 'Invalid email or password. Please try again.';
      }
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
