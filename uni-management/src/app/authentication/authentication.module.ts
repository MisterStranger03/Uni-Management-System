// src/app/authentication/authentication.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Import this

import { AuthenticationRoutingModule } from './authentication-routing.module';

// --- Import Components ---
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component'; // Import if you have an OTP component

// --- Import Angular Material Modules ---
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  // Declare the components that belong to this module
  declarations: [
    LoginComponent,
    SignupComponent,
    OtpComponent // Include this if you have an OTP component
    // Add other components here if needed, e.g., OtpComponent
  ],
  // Import all the modules needed by the components declared above
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule, // <-- Add to imports
    
    // Add all required Material modules here
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class AuthenticationModule { }