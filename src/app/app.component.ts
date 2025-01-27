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
  constructor(private router: Router) {}

  // Verifica si estamos en la página de login
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  // Cierra la sesión y redirecciona al login
  logout(): void {
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);
  }
  testClick(event: MouseEvent): void {
    console.log('Clic detectado por Angular:', event);
  }
}