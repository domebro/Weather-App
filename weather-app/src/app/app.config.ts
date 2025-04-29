import { provideHttpClient } from '@angular/common/http'; // Stellt den HttpClient global zur Verfügung
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router'; // Aktiviert das Routing und verwendet die übergebenen Routes

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient()]
};
