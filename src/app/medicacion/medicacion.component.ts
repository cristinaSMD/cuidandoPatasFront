import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterListComponent } from '../master-list/master-list.component';
import { columnsConfig } from '../config/column-config';

@Component({
  selector: 'app-medicacion',
  standalone: true,
  templateUrl: './medicacion.component.html',
  styleUrls: ['./medicacion.component.css'],
  imports: [MasterListComponent],
})
export class MedicacionComponent {
  // Columnas específicas para medicación
  columns = columnsConfig.medicacion;

  // Datos de medicación hasta tener llamada al back
  data = [
    { name: 'Gabapentina', 
      dose: '500mg', 
      frequency: '8h', 
      dateStart: '24-05-2024', 
      active: true,   
      detail: 'Sirve para tratar problemas de dolor crónico y calambres musculares.'  },
    { name: 'Fluoxetina', 
      dose: '400mg', frequency: '1 vez al día', 
      dateStart: '24-05-2024', 
      dateEnd: '30-05-2024', 
      active: false,
      detail: 'Este es un medicamento antiinflamatorio para tratamiento de dolor.'
    },
    { name: 'Vitamina C', dose: '1000mg', frequency: 'Diario', dateStart: '24-05-2024', active: true },
  

  ];

  constructor(private router: Router) {}

  navigateToDetail(row: any): void {
    // Navega a la página de detalle del medicamento, enviando el nombre como parámetro
    this.router.navigate(['/medicacion-detalle', row.name]);
  }
}