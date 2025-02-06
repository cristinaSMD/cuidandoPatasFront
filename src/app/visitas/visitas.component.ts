import { Component, OnInit } from '@angular/core'; // Importamos OnInit para inicialización
import { MatCalendar } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.css'],
  standalone: true,
  imports: [
    MatCalendar,
    MatButtonModule,
    CommonModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
})
export class VisitasComponent implements OnInit {
  // Fecha seleccionada en el calendario
  fechaSeleccionada: Date = new Date();

  // Lista de visitas guardadas
  visitas: Date[] = [];

  ngOnInit(): void {
    // Al iniciar el componente, cargamos las visitas desde localStorage
    const visitasGuardadas = localStorage.getItem('visitas');
    if (visitasGuardadas) {
      this.visitas = JSON.parse(visitasGuardadas).map((fecha: string) => new Date(fecha));
    }
  }

  // Método para guardar visitas en la lista
  guardarFecha() {
    if (!this.visitas.find(fecha => fecha.toDateString() === this.fechaSeleccionada.toDateString())) {
      this.visitas.push(this.fechaSeleccionada);

      // Actualizar el localStorage tras guardar la fecha
      localStorage.setItem('visitas', JSON.stringify(this.visitas));
    }
  }
}