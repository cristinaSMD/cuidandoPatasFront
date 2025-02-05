import { Component } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker'; // Importa directamente el MatCalendar
import { MatButtonModule } from '@angular/material/button'; // Para botones de Angular Material
import { CommonModule } from '@angular/common'; // Para directivas de Angular como *ngFor
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
export class VisitasComponent {
  // Fecha seleccionada en el calendario
  fechaSeleccionada: Date = new Date();

  // Lista de visitas guardadas
  visitas: Date[] = [];

  // Método para guardar visitas en la lista
  guardarFecha() {
    if (!this.visitas.includes(this.fechaSeleccionada)) {
      this.visitas.push(this.fechaSeleccionada);
    }
  }
}