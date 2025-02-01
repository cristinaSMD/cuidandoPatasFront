import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { MedicacionComponent } from './medicacion/medicacion.component';
import { VisitasComponent } from './visitas/visitas.component';
import { MedicacionDetalleComponent } from './medicacion/medicacion-detalle/medicacion.detalle.component'; 



export const routes: Routes = [
  // Ruta raíz
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login
  { path: 'login', component: LoginComponent },

  // Home
  { path: 'home', component: HomeComponent },

  // Perfil
  { path: 'perfil', component: PerfilComponent },

  // Pruebas
  { path: 'pruebas', component: PruebasComponent },

  // Medicación
  { path: 'medicacion', component: MedicacionComponent },

  // Medicación detalle
  { path: 'medicacion.detalle/:name', component: MedicacionDetalleComponent }, 


  // Visitas
  { path: 'visitas', component: VisitasComponent },



  // Ruta comodín para redirigir a login si la ruta no existe
  { path: '**', redirectTo: 'login' },
];