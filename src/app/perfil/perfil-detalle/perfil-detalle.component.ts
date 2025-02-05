import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service'; 
import { Mascota } from '../../shared/models/mascota.model';
import { CommonModule } from '@angular/common'; // IMPORTA CommonModule base.



@Component({
  selector: 'app-perfil-detalle',
  templateUrl: './perfil-detalle.component.html',
  styleUrls: ['./perfil-detalle.component.css'],
  standalone: true,
  // IMPORTAR CommonModule AQUÍ
  imports: [CommonModule], // Permite usar el pipe `date` y directivas como *ngIf
})
export class PerfilDetalleComponent implements OnInit {
  mascota: Mascota | null = null;

  constructor(private route: ActivatedRoute, private petService: PetService) {}

  ngOnInit(): void {
    const petId = this.route.snapshot.paramMap.get('id'); 
    if (petId) {
      this.petService.getPetById(petId).subscribe({
        next: (data: Mascota) => (this.mascota = data), 
        error: (err: any) => console.error('Error al recuperar la mascota:', err),
      });
    }
  }
}