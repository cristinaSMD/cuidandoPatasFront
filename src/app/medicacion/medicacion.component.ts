import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicacionService } from '../services/medicacion.service';
import { MasterListComponent } from '../master-list/master-list.component';
import { columnsConfig } from '../config/column-config';
import { Mascota } from '../shared/models/mascota.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicacion',
  standalone: true,
  templateUrl: './medicacion.component.html',
  styleUrls: ['./medicacion.component.css'],
  imports: [MasterListComponent, CommonModule, ReactiveFormsModule],
})
export class MedicacionComponent implements OnInit {
  columns = columnsConfig.medicacion;

  data: any[] = []; 
  mascotas: Mascota[] = []; 
  selectedPetId: string | null = null;


  createMedicacionForm: FormGroup;
  isCollapsed = true; 

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private medicacionService: MedicacionService 
  ) {
    // Inicializar el formulario reactivo
    this.createMedicacionForm = this.fb.group({
      name: ['', Validators.required],
      dose: ['', Validators.required],
      frequency: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: [''], // No es obligatorio
      active: [false],
    });
  }

  ngOnInit(): void {
    this.cargarMascotas(); 
    console.log("Estado inicial de mascotas antes de cargar:", this.mascotas);
  }

  // Método para cargar las mascotas asociadas al usuario
  cargarMascotas(): void {
    const usuarioId = localStorage.getItem('userSessionId'); 

    if (!usuarioId) {
      console.error('No hay ID de sesión en localStorage. No se pueden cargar las mascotas.');
      return;
    }

    // Llamada al servicio para obtener las mascotas
    this.medicacionService.getMascotasByUsuarioId(usuarioId).subscribe({
      next: (response) => {
        this.mascotas = response; 
        console.log('Mascotas cargadas:', this.mascotas);

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
        this.data = response; 
      },
      error: (err) => {
        this.data = [];
        console.error('Error al obtener las medicaciones del backend:', err);
      },
    });
  }

  // Método para manejar el clic en un botón de mascota
  seleccionarMascota(petId: string): void {
    this.selectedPetId = petId; 
    this.cargarMedicaciones(petId); 
  }

  // Método para guardar una medicación
  createMedicacion(): void {
    if (this.selectedPetId && this.createMedicacionForm.valid) {
      const medicacion = this.createMedicacionForm.value;
      this.medicacionService.createMedicacion(this.selectedPetId, medicacion).subscribe({
        next: () => {
          this.cargarMedicaciones(this.selectedPetId as string);
          alert('Medicación creada ');
          this.createMedicacionForm.reset({ active: false }); 
          this.isCollapsed = true; 
        },
        error: (err) => {
          console.error('Error al crear la medicación:', err);
          alert('Hubo un error al guardar la medicación. Por favor, inténtalo nuevamente.');
        },
      });
    } else {
      alert('Por favor selecciona una mascota y completa el formulario.');
    }
  }


  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed; 
  }
}