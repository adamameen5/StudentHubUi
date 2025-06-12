import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';  // Assume you have AuthService for authentication

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;  // Allow route access
    } else {
      this.router.navigate(['/auth/boxed-signin']);  // Redirect to sign-in
      return false;
    }
  }
}
