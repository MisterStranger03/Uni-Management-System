// src/app/authentication/signup/signup.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false, // This is the default behavior, so you can omit it
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isLoading = false;
  // We no longer need successMessage here, as we navigate away immediately.
  errorMessage: string | null = null;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      dob: ['', [Validators.required]],
      role: ['student', [Validators.required]],
    });
  }

  // --- THIS IS THE UPDATED METHOD ---
  async onSubmit(): Promise<void> {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); // Mark fields to show errors if not touched
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // Get the form data before the try block
    const formData = this.signupForm.value;

    try {
      // Step 1: Call the register service. This triggers the backend to send the OTP.
      await this.profileService.register(formData);

      // Step 2: On success, navigate to the OTP component.
      // We pass the user's email as a route parameter so the OTP page knows who to verify.
      this.router.navigate(['/authentication/otp', formData.email]);

    } catch (error: any) {
      // If there's an error (e.g., email already exists), show the message.
      this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      this.isLoading = false; // Stop the spinner only on error.
    }
    // Note: We don't set isLoading to false on success because the page is navigating away.
  }
}