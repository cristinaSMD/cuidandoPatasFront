import { Component, OnInit } from '@angular/core'; 
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
  fechaSeleccionada: Date = new Date();
  visitas: Date[] = [];

  ngOnInit(): void {
    const visitasGuardadas = localStorage.getItem('visitas');
    if (visitasGuardadas) {
      this.visitas = JSON.parse(visitasGuardadas).map((fecha: string) => new Date(fecha));
    }
  }

  // Método para guardar visitas en la lista
  guardarFecha() {
    if (!this.visitas.find(fecha => fecha.toDateString() === this.fechaSeleccionada.toDateString())) {
      this.visitas.push(this.fechaSeleccionada);
      localStorage.setItem('visitas', JSON.stringify(this.visitas));
    }
  }
}