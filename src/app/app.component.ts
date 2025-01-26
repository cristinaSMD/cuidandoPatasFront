import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Componente independiente
  template: `<router-outlet></router-outlet>`, // Aquí se cargan las rutas
  imports: [RouterOutlet], // Importa el RouterOutlet para mostrar rutas
})
export class AppComponent {}