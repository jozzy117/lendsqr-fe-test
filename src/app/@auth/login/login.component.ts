import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  login() {
    this.emailError = null;
    this.passwordError = null;

    if (!this.email) {
      this.emailError = 'Email is required';
    } else if (!this.validateEmail(this.email)) {
      this.emailError = 'Invalid email format';
    }

    if (!this.password) {
      this.passwordError = 'Password is required';
    }

    if (!this.emailError && !this.passwordError) {
      // Perform the login logic, e.g., call an authentication service
      // For now, we simply navigate to the dashboard
      this.router.navigate(['/lendsqr/dashboard']);
    }
  }
}
