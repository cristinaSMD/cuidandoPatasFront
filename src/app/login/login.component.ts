import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // DECLARACIÓN DE STANDALONE
  imports: [CommonModule, ReactiveFormsModule], // Importar solo lo que necesitas
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    // Verificar que el formulario sea válido
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http.post('/api/v1/users/loginProcess', loginData).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.errorMessage = null;
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          this.errorMessage =
            error.status === 401 ? 'Usuario o contraseña incorrectos' : 'Error de servidor';
        },
      });
    }
  }
}