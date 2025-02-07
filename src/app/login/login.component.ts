import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { UsuarioService } from '../services/usuario.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importar solo lo necesario
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isCreatingUser: boolean = false; // Control para alternar entre login y creación de usuario

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService, // Usar el servicio UsuarioService
    private router: Router
  ) {
    // Crear formulario reactivo
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.email]], // Nuevo campo de email
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

  // Método para alternar al modo de "Crear Usuario"
  toggleCreateUser(): void {
    this.isCreatingUser = !this.isCreatingUser;
    // Limpiar mensaje de error al alternar
    this.errorMessage = null;
  }

  // Método para manejar la creación de usuario
  onCreateUser(): void {
    if (this.loginForm.valid && this.loginForm.get('email') != null) {
      const userData = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
        email: this.loginForm.get('email')?.value,
      };

      // Usar el servicio para hacer la solicitud al backend
      this.usuarioService.createUser(userData).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente:', response);

          // Mostrar mensaje de éxito y volver al modo de Login
          alert('Usuario creado exitosamente. Ahora puedes iniciar sesión.');
          this.isCreatingUser = false;
          this.loginForm.reset();
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          this.errorMessage = 'Error al crear usuario. Por favor, intenta de nuevo.';
        },
      });
    } else {
      this.errorMessage = 'campos incorrectos';
    }
  }

  // Método que se ejecuta al enviar el formulario de Login
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      // Usar el servicio para iniciar sesión
      this.usuarioService.login(username, password).subscribe({
        next: (response) => {
          // Guardar el ID de sesión y el nombre del usuario en localStorage
          localStorage.setItem('userSessionId', response); // response es el ID de sesión
          localStorage.setItem('username', username); // Guardar el nombre del usuario

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
      alert('Por favor, llena todos los campos correctamente')
    }
  }
}