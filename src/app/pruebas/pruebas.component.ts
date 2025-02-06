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
  // Asociamos las columnas de la tabla según `columnsConfig.pruebas`
  columns = columnsConfig.pruebas;

  // Información de datos y mascota seleccionada
  data: any[] = []; // Datos de las pruebas
  mascotas: Mascota[] = []; // Lista de mascotas
  selectedPetId: string | null = null; // Mascota seleccionada

  // Configuración del formulario reactivo
  createPruebaForm: FormGroup;
  isCollapsed = true; // Estado para mostrar/ocultar el formulario

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pruebasService: PruebasService // Servicio que maneja datos de pruebas
  ) {
    // Inicializamos el formulario
    this.createPruebaForm = this.fb.group({
      type: ['', Validators.required], // Tipo de prueba como análisis de sangre, radiografía, etc.
      date: ['', Validators.required], // Fecha de la prueba
      result: [''], // Campo para el resultado si aplica
    });
  }

  ngOnInit(): void {
    // Cargar las mascotas cuando el componente se inicialice
    this.cargarMascotas();
  }

  // Método para cargar las mascotas asociadas al usuario
  cargarMascotas(): void {
    // Recuperar el ID del usuario de la sesión local
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
        this.data = response; // Guardar las pruebas en el arreglo `data`
      },
      error: (error) => {
        console.error('Error al obtener las pruebas:', error);
      },
    });
  }

  // Método para manejar la selección de mascota
  seleccionarMascota(petId: string): void {
    this.selectedPetId = petId; // Guardar el ID de la mascota seleccionada
    this.cargarPruebas(petId); // Cargar las pruebas asociadas
  }

  // Método para crear una nueva prueba
  createPrueba(): void {
    if (this.selectedPetId && this.createPruebaForm.valid) {
      const prueba = this.createPruebaForm.value; // Datos del formulario

      // Llamar al servicio para guardar la nueva prueba
      this.pruebasService.createPrueba(this.selectedPetId, prueba).subscribe({
        next: () => {
          this.cargarPruebas(this.selectedPetId as string); // Cargar nuevamente las pruebas
          alert('Prueba creada correctamente.');
          this.createPruebaForm.reset(); // Reiniciar el formulario
          this.isCollapsed = true; // Ocultar el formulario
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

  // Método para alternar el estado del formulario (colapsar/expandir)
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}