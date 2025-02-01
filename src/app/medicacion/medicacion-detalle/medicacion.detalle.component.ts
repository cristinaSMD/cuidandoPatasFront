import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FieldConfigs } from '../../config/field-config';

@Component({
  selector: 'app-medicacion-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medicacion.detalle.component.html',
  styleUrls: ['./medicacion.detalle.component.css'],
})
export class MedicacionDetalleComponent implements OnInit {

  fieldConfig = FieldConfigs.medicaciones; // Configuración específica para medicaciones
  selectedMedicamento: any = null; // Medicamento seleccionado

  // Datos simulados
  medicaciones = [
    { name: 'Gabapentina', dose: '500mg', frequency: '2 veces al día', dateStart: '24-05-2024', active: true },
    { name: 'Fluoxetina', dose: '400mg', frequency: '1 vez al día', dateStart: '24-05-2024', dateEnd: '30-05-2024', active: false },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name'); // Obtener nombre del medicamento
    this.selectedMedicamento = this.medicaciones.find(med => med.name === name);
  }
}