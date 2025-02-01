import { Component } from '@angular/core';
import { MasterListComponent } from '../master-list/master-list.component';
import { columnsConfig } from '../config/column-config';

@Component({
  selector: 'app-pruebas',
  standalone: true,
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css'],
  imports: [MasterListComponent],
})
export class PruebasComponent {
  // Columnas específicas para pruebas
  columns = columnsConfig.pruebas;

  // Datos de las prueba
  data = [
    { tipo: 'Laboratorio', fecha: '2023-10-15', resultado: 'Normal' },
    { tipo: 'Diagnóstico', fecha: '2023-09-10', resultado: 'Pendiente' },
  ];
}