import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicacionService } from '../services/medicacion.service';
import { MasterListComponent } from '../master-list/master-list.component';
import { columnsConfig } from '../config/column-config';
import { Mascota } from '../shared/models/mascota.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicacion',
  standalone: true,
  templateUrl: './medicacion.component.html',
  styleUrls: ['./medicacion.component.css'],
  imports: [MasterListComponent, CommonModule
  ],
})
export class MedicacionComponent implements OnInit {
  // Columnas específicas para medicación
  columns = columnsConfig.medicacion;

  // Información para las listas de datos
  data: any[] = []; // Medicaciones asociadas a una mascota
  mascotas: Mascota[] = []; // Lista inicial de mascotas como un arreglo vacío
  selectedPetId: string | null = null; // Mascota seleccionada



  constructor(
    private router: Router,
    private medicacionService: MedicacionService // Inyectamos el servicio aquí
  ) { }

  ngOnInit(): void {
    this.cargarMascotas(); // Cargamos las mascotas al iniciar el componente

    console.log("Estado inicial de mascotas antes de cargar:", this.mascotas); // Añade este log
    this.cargarMascotas(); // Cargamos las mascotas al iniciar el componente
    

  }

  // Método para cargar las mascotas asociadas al usuario
  cargarMascotas() {
    const usuarioId = localStorage.getItem('userSessionId'); // Obtener el ID de sesión del usuario

    if (!usuarioId) {
      console.error('No hay ID de sesión en localStorage. No se pueden cargar las mascotas.');
      return;
    }

    // Llamada al servicio para obtener las mascotas
    this.medicacionService.getMascotasByUsuarioId(usuarioId).subscribe({
      next: (response) => {
        this.mascotas = response; // Asignamos las mascotas obtenidas al arreglo
        console.log('Mascotas cargadas:', this.mascotas);

        // Selecciona automáticamente la primera mascota si existe
        if (this.mascotas.length > 0) {
          this.seleccionarMascota(this.mascotas[0].id);
        }
      },
      error: (error) => {
        console.error('Error al cargar las mascotas:', error);
      },
    });
  }

  // Método para cargar las medicaciones de una mascota específica
  cargarMedicaciones(petId: string): void {
    this.medicacionService.getMedicacionesByPetId(petId).subscribe({
      next: (response) => {
        this.data = response; // Asignamos las medicaciones al arreglo `data`
      },
      error: (err) => {
        console.error('Error al obtener las medicaciones del backend:', err);
      },
    });
  }
  // Método para manejar el clic en un botón de mascota
  seleccionarMascota(petId: string): void {
    this.selectedPetId = petId; // Guardamos el ID de la mascota seleccionada
    this.cargarMedicaciones(petId); // Cargamos las medicaciones asociadas a la mascota
  }

}