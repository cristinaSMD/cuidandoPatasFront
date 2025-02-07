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
  imports: [CommonModule, MatIconModule, MatTooltipModule], 
})
export class MasterListComponent {
  @Input() columns: { header: string; field: string }[] = [];
  @Input() data: any[] = [];

  @Output() crearElemento = new EventEmitter<void>();

  constructor(private router: Router) { } 

  // Método para manejar la navegación
  navigateToDetail(row: any): void {
  
    this.router.navigate(['/medicacion.detalle', row.name]);
  }
 
  onCrearClick(): void {
    this.crearElemento.emit();
  }

}
