import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent {
  username: string | null = null; // Almacena el nombre del usuario actual

  constructor(private router: Router) {
    // Restaurar el nombre del usuario desde el localStorage
    this.loadUserData();
  }

  // Cargar los datos del usuario desde el localStorage
  private loadUserData(): void {
    this.username = localStorage.getItem('username'); // Leer el nombre de usuario
  }

  // Verifica si estamos en la página de login
  isLoginPage(): boolean {
    return this.router.url === '/login'; // Comprobar la URL actual
  }

  // Cierra la sesión y redirecciona al login
  logout(): void {
    // Eliminar los datos del localStorage al cerrar sesión
    localStorage.removeItem('userSessionId');
    localStorage.removeItem('username');
    console.log('Sesión cerrada.');
    this.username = null; // Limpia el estado del componente
    this.router.navigate(['/login']); // Redirige al login
  }
}