import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  // Ruta raíz
  {
    path: '',
    component: HomeComponent,
  },
  // Ruta explícita para "Home"
  {
    path: 'home',
    component: HomeComponent,
  },
  // Rutas con lazy loading para cada componente
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
  // Ruta para manejar errores de página no encontrada
  {
    path: '**',
    redirectTo: '/home',
  },
];