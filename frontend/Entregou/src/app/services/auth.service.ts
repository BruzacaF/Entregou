import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.clear();
  }

  constructor() {
    console.log('AuthService initialized');
  }
}