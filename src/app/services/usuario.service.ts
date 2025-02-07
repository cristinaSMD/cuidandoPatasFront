import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace el servicio disponible en toda la aplicación
})
export class UsuarioService {
  private baseUrl = '/api/v1/users'; // Ruta base para los endpoints del backend

  constructor(private http: HttpClient) {}

  /**
   * Método para iniciar sesión
   * Envía las credenciales al backend y obtiene el ID de sesión.
   */
  login(username: string, password: string): Observable<string> {
    const loginData = { username, password };
    return this.http.post<string>(`${this.baseUrl}/loginProcess`, loginData, {
      responseType: 'text' as 'json',
    });
  }

  /**
   * Método para crear un nuevo usuario
   * Envía los datos al backend y recibe el resultado.
   */
  createUser(user: { username: string; password: string; email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, user);
  }
}