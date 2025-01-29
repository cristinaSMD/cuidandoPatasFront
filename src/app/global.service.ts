import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Este servicio estará disponible en toda la aplicación
})
export class GlobalService {
  // Variables globales
  public userSessionId: string = '';
}
