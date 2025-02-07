import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PruebasService } from '../services/pruebas.service';
import { MasterListComponent } from '../master-list/master-list.component';
import { columnsConfig } from '../config/column-config'; // Importamos las columnas configuradas
import { Mascota } from '../shared/models/mascota.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pruebas',
  standalone: true,
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css'],
  imports: [MasterListComponent, CommonModule, ReactiveFormsModule],
})
export class PruebasComponent implements OnInit {
  columns = columnsConfig.pruebas;

  data: any[] = []; 
  mascotas: Mascota[] = []; 
  selectedPetId: string | null = null;


  createPruebaForm: FormGroup;
  isCollapsed = true; 

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pruebasService: PruebasService 
  ) {
    // Inicializamos el formulario
    this.createPruebaForm = this.fb.group({
      type: ['', Validators.required], 
      date: ['', Validators.required], 
      result: [''], 
    });
  }

  ngOnInit(): void {
    this.cargarMascotas();
  }

  // Método para cargar las mascotas asociadas al usuario
  cargarMascotas(): void {
    const usuarioId = localStorage.getItem('userSessionId');
    if (!usuarioId) {
      console.error('No se ha encontrado una sesión activa.');
      return;
    }

    // Llamar al servicio para cargar las mascotas del usuario
    this.pruebasService.getMascotasByUsuarioId(usuarioId).subscribe({
      next: (response) => {
        this.mascotas = response;
        if (this.mascotas.length > 0) {
          // Seleccionar la primera mascota por defecto
          this.seleccionarMascota(this.mascotas[0].id);
        }
      },
      error: (error) => {
        console.error('Error al cargar las mascotas:', error);
      },
    });
  }

  // Método para cargar las pruebas asociadas a la mascota seleccionada
  cargarPruebas(petId: string): void {
    this.pruebasService.getPruebasByPetId(petId).subscribe({
      next: (response) => {
        this.data = response; 
      },
      error: (error) => {
        this.data = [];
        console.error('Error al obtener las pruebas:', error);
      },
    });
  }

  // Método para manejar la selección de mascota
  seleccionarMascota(petId: string): void {
    this.selectedPetId = petId; 
    this.cargarPruebas(petId); 

  }

  // Método para crear una nueva prueba
  createPrueba(): void {
    if (this.selectedPetId && this.createPruebaForm.valid) {
      const prueba = this.createPruebaForm.value;
      this.pruebasService.createPrueba(this.selectedPetId, prueba).subscribe({
        next: () => {
          this.cargarPruebas(this.selectedPetId as string); 
          alert('Prueba creada correctamente.');
          this.createPruebaForm.reset(); 
          this.isCollapsed = true; 
        },
        error: (error) => {
          console.error('Error al crear la prueba:', error);
          alert('Hubo un error al guardar la prueba. Intenta nuevamente.');
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