// src/app/services/profile.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { NewUser } from '../models/new-user.model'; // Your existing model for a new user

// --- Interfaces for expected server responses ---

// The expected response after successfully initiating registration
export interface RegisterResponse {
  message: string;
}

// The expected response after successfully verifying the OTP
export interface VerifyOtpResponse {
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // The base URL for your Express backend's authentication routes
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  /**
   * Step 1 of Registration: Sends new user data to the backend.
   * The backend will create a temporary user and generate an OTP.
   * @param userData The new user's information from the signup form.
   * @returns A promise that resolves with the server's response message.
   */
  async register(userData: NewUser): Promise<RegisterResponse> {
    try {
      // The '/register' endpoint now triggers OTP generation
      const response = await lastValueFrom(
        this.http.post<RegisterResponse>(`${this.apiUrl}/register`, userData)
      );
      return response;

    } catch (error) {
      console.error('Registration initiation failed:', error);
      // Re-throw the error so the signup component can display a message
      throw error;
    }
  }

  /**
   * Step 2 of Registration: Verifies the OTP to activate the user's account.
   * @param payload An object containing the user's email and the OTP they entered.
   * @returns A promise that resolves with the server's success message.
   */
  async verifyOtp(payload: { email: string; otp: string }): Promise<VerifyOtpResponse> {
    try {
      // Call the new '/verify-otp' endpoint on the backend
      const response = await lastValueFrom(
        this.http.post<VerifyOtpResponse>(`${this.apiUrl}/verify-otp`, payload)
      );
      return response;

    } catch (error) {
      console.error('OTP verification failed:', error);
      // Re-throw the error so the OTP component can display a message
      throw error;
    }
  }

  // Future methods for managing a user's profile can be added here.
  // For example:
  // async getMyProfile(): Promise<any> { ... }
  // async updateMyProfile(data: any): Promise<any> { ... }
}