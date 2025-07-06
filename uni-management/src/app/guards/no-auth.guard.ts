// src/app/authentication/guards/no-auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return true; // User is not logged in, allow access to login/signup
  } else {
    // User is already logged in, redirect them to the dashboard
    router.navigate(['/home/dashboard']);
    return false;
  }
};