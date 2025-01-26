import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';


const isProd = false; // Tengo que cambiarlo a `true` si estás preparando un entorno de producción

if (isProd) {
  enableProdMode(); // Habilita el modo producción si estás en producción
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));