import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../services/pet.service'; 
import { Mascota } from '../../shared/models/mascota.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-perfil-detalle',
  templateUrl: './perfil-detalle.component.html',
  styleUrls: ['./perfil-detalle.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule, // Importar el módulo del Datepicker
    MatInputModule, // Importar el módulo para el componente <input>
    MatNativeDateModule, // Para formato de fechas nativo
  ],
})
export class PerfilDetalleComponent implements OnInit {
  mascota: Mascota | null = null; // Datos de la mascota

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    const petId = this.route.snapshot.paramMap.get('id'); 
    if (petId) {
      this.petService.getPetById(petId).subscribe({
        next: (data: Mascota) => (this.mascota = data), 
        error: (err: any) => console.error('Error al recuperar la mascota:', err),
      });
    }
  }

  updatePet(): void {
    if (this.mascota) {
      const userSessionId = localStorage.getItem('userSessionId');

      if (!userSessionId) {
        alert('No se ha podido encontrar el ID de sesión del usuario. Por favor, inicia sesión nuevamente.');
        return;
      }

      this.petService.updatePet(userSessionId, this.mascota).subscribe({
        next: () => {
          this.router.navigate(['/perfil']); // Redirigir al perfil
        },
        error: (err: any) => console.error('Error al actualizar la mascota:', err),
      });
    }
  }

  markPetAsDeceased(): void {
    if (this.mascota) {
      this.petService.markPetAsDeceased(this.mascota.id).subscribe({
        next: () => {
          this.router.navigate(['/perfil']); // Redirigir al perfil
        },
        error: (err: any) => console.error('Error al marcar como fallecida:', err),
      });
    }
  }
}