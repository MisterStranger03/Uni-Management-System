// src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// --- Imports to add ---
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Existing providers
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),

    // --- Add these two lines ---

    // Provides HttpClient to be injectable throughout your application
    provideHttpClient(),

    // Provides browser animations needed for Angular Material components to work correctly
    provideAnimationsAsync()
  ]
};