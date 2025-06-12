import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token'); 
    return !!token;
  }

  login(token: string, userName: string, workspaceId : number, userId: number, firstName : string, lastName : string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('workspaceId', workspaceId.toString());
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
  }

  logout(): void {
    localStorage.removeItem('auth_token');  // Remove token on logout
  }
}
