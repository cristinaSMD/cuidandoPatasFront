import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../shared/models/mascota.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
 
  private baseUrl = '/api/v1/pets'; // Base URL para las mascotas

  constructor(private http: HttpClient) {}

  // Método para obtener todas las mascotas de un usuario por su ID
  getPetsByUserId(userId: string): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}/${userId}/find`);
  }

  // Método para crear una nueva mascota
  createPet(userId: string, petData: any): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.baseUrl}/${userId}/create`, petData);
  }
  // Método para devolver una mascota por su id
  getPetById(petId: string): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.baseUrl}/${petId}`);
  }


}