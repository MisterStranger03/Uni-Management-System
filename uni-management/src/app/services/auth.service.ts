// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { UserCredentials } from '../models/user-credentials.model';

// This interface defines the expected response from our backend's login endpoint
export interface AuthResponse {
  message: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // The URL of your Express backend's authentication routes
  private apiUrl = 'http://localhost:3000/api/auth';
  private readonly JWT_TOKEN_KEY = 'jwt_token';

  // BehaviorSubject to broadcast the authentication status.
  // `true` if logged in, `false` if not.
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Logs in the user by sending credentials to the backend.
   * This method works for any login attempt, whether the user is verified or not.
   * The backend is responsible for checking the verification status.
   * @param credentials The user's email and password.
   */
  async login(credentials: UserCredentials): Promise<void> {
    try {
      // Convert the Observable to a Promise to use await
      const response = await lastValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      );

      // If login is successful, store the token
      this.storeToken(response.accessToken);
      // Notify all subscribers that the user is now authenticated
      this.isAuthenticatedSubject.next(true);
      // Redirect to the main dashboard
      this.router.navigate(['/home/dashboard']);

    } catch (error) {
      console.error('Login failed:', error);
      // This block correctly catches ALL login errors from the backend,
      // including "Invalid credentials" and the new "account not verified" error.
      // We re-throw the error so the component can catch it and display the message.
      throw error;
    }
  }

  /**
   * Logs out the user by removing the token and redirecting.
   */
  logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/authentication/login']);
  }

  /**
   * Checks if a JWT token exists in local storage.
   * This is a synchronous check, perfect for route guards.
   * @returns `true` if the token exists, otherwise `false`.
   */
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  /**
   * Retrieves the stored JWT token.
   * @returns The token string or `null` if not found.
   */
  getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN_KEY);
  }

  // --- Private Helper Methods ---

  private storeToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.JWT_TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN_KEY);
  }
}