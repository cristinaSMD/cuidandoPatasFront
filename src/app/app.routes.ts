import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./perfil/perfil.component').then((m) => m.PerfilComponent),
  },
  {
    path: 'datos',
    loadComponent: () =>
      import('./datos/datos.component').then((m) => m.DatosComponent),
  },
  {
    path: 'pruebas',
    loadComponent: () =>
      import('./pruebas/pruebas.component').then((m) => m.PruebasComponent),
  },
  {
    path: 'medicacion',
    loadComponent: () =>
      import('./medicacion/medicacion.component').then(
        (m) => m.MedicacionComponent
      ),
  },
  {
    path: 'visitas',
    loadComponent: () =>
      import('./visitas/visitas.component').then((m) => m.VisitasComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: '/login' },
];