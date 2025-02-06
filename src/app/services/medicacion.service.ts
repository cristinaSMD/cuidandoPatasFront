import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../shared/models/mascota.model';

@Injectable({
  providedIn: 'root',
})
export class MedicacionService {
  private baseUrl = 'http://localhost:8080/api/v1/pet'; // Endpoint base de tu backend

  constructor(private http: HttpClient) {}

  // Método para obtener todas las medicaciones asociadas a una mascota
  getMedicacionesByPetId(petId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${petId}/medicine`);
  }

  // Método para guardar una nueva medicación
  createMedicacion(petId: string, medicacion: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${petId}/medicine`, medicacion);
  }


// Método para obtener todas las mascotas asociadas al usuario
getMascotasByUsuarioId(usuarioId: string): Observable<Mascota[]> {
  return this.http.get<Mascota[]>(`/api/v1/pets/${usuarioId}/find`);
}

}