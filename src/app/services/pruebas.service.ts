import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PruebasService {
  private baseUrl = 'http://localhost:8080/api/v1/pet';

  constructor(private http: HttpClient) {}

  getPruebasByPetId(petId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${petId}/pruebas`);
  }

  createPrueba(petId: string, prueba: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${petId}/pruebas`, prueba);
  }

  getMascotasByUsuarioId(usuarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/v1/pets/${usuarioId}/find`);
  }
}