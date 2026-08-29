import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {

  providers: [

    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),

    importProvidersFrom(FormsModule)

  ]

};