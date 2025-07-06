// src/app/authentication/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  // standalone: false, <-- This is now the default, so you can omit it
  // The 'imports' array is removed from here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false, // This is the default behavior, so you can omit it
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    try {
      await this.authService.login(this.loginForm.value);
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
    } finally {
      this.isLoading = false;
    }
  }
}