import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para las directivas de Angular como *ngFor y *ngIf.
import { MatIconModule } from '@angular/material/icon'; // Módulo para íconos de Material.
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';



@Component({
  selector: 'app-master-list',
  standalone: true,
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css'],
  imports: [CommonModule, MatIconModule, MatTooltipModule], // Importa MatIconModule aquí.
})
export class MasterListComponent {
  @Input() columns: { header: string; field: string }[] = [];
  @Input() data: any[] = [];

  @Output() crearElemento = new EventEmitter<void>(); // Evento para el botón "Crear"

  constructor(private router: Router) { } // Inyectar el Router

  // Método para manejar la navegación al detalle
  navigateToDetail(row: any): void {
    // Aquí puedes pasar parámetros como el nombre o ID del medicamento
    this.router.navigate(['/medicacion.detalle', row.name]);
  }
  // Este método emitirá el evento cuando se haga clic en "Crear"
  onCrearClick(): void {
    this.crearElemento.emit();
  }

}
