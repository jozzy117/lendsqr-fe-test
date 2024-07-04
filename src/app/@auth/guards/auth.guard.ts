import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild  {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    return this.checkLogin();
  }

  canActivateChild(): boolean {
    return this.checkLogin();
  }

  private checkLogin(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
  
}
