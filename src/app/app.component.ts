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
  username: string | null = null; 

  constructor(private router: Router) {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.username = localStorage.getItem('username'); 
  }

  // Verifica si estamos en la página de login
  isLoginPage(): boolean {
    return this.router.url === '/login'; 
  }

  // Cierra la sesión y redirecciona al login
  logout(): void {
    localStorage.removeItem('userSessionId');
    localStorage.removeItem('username');
    console.log('Sesión cerrada.');
    this.username = null; 
    this.router.navigate(['/login']); 
  }
}