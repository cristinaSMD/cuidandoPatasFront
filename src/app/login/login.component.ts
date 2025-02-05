import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Declaración de componente standalone
  imports: [CommonModule, ReactiveFormsModule], // Importar solo lo necesario
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router // Inyectar el Router
  ) {
    // Crear formulario reactivo
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // Método que se ejecuta automáticamente al cargar el componente
  ngOnInit() {
    // Verificar si ya hay una sesión activa guardada en localStorage
    const savedUserSessionId = localStorage.getItem('userSessionId');
    if (savedUserSessionId) {
      console.log('Sesión activa encontrada: ' + savedUserSessionId);
      // Si hay sesión activa, redirigir directamente al /home
      this.router.navigate(['/home']);
    }
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http.post<string>('/api/v1/users/loginProcess', loginData,
         { responseType: 'text' as 'json' }//Añadimos esto para leer el response como string
      ).subscribe({
        next: (response) => {
          // Guardar el ID de sesión y el nombre del usuario en localStorage
          localStorage.setItem('userSessionId', response); // response es el ID de sesión
          localStorage.setItem('username', loginData.username); // Guardar el nombre del usuario

          console.log('Sesión iniciada. ID:', response);

          // Redirigir al usuario a la pantalla principal
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          this.errorMessage =
            error.status === 401 ? 'Usuario o contraseña incorrectos' : 'Error de servidor';
        },
      });
    } else {
      this.errorMessage = 'Por favor, llena todos los campos correctamente';
    }
  }
}