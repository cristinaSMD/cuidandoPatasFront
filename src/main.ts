import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Aquí proporcionamos las rutas
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));