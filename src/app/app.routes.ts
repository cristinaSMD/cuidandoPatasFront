import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent, // Pantalla principal
  },
];