// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  // Authentication routes (login, signup, etc.)
  // These routes are only accessible if the user is NOT logged in.
  {
    path: 'authentication',
    canActivate: [noAuthGuard],
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },

  // Main application routes (dashboard, profile, etc.)
  // These routes are protected and require the user to be logged in.
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },

  // Default redirect
  {
    path: '',
    redirectTo: '/authentication/signup', // Redirect to dashboard by default
    pathMatch: 'full'
  },

  // Wildcard route for 404
  {
    path: '**',
    redirectTo: '/home/dashboard' // Or a dedicated 404 component
  }
];