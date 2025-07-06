// src/app/authentication/authentication-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component'; // Import the OTP component

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'otp/:email', // <-- Add route with an :email parameter
    component: OtpComponent
  },
  // {
  //   path: 'otp',
  //   component: OtpComponent
  // },
  {
    // Default route for '/authentication' -> redirects to '/authentication/login'
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }