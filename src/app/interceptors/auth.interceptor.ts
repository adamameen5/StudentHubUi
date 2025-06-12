import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Adjust path to your AuthService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get token from local storage
        const authToken = localStorage.getItem('auth_token');

        let authReq = req;
        if (authToken) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        }

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    console.log('401 Unauthorized detected, redirecting to login'); // Debugging line
                    // Clear authentication data
                    this.authService.logout();
                    // Redirect to login page
                    this.router.navigate(['/auth/boxed-signin'], {
                        queryParams: { returnUrl: this.router.url, sessionExpired: true }
                    });
                }
                return throwError(() => error);
            })
        );
    }
}