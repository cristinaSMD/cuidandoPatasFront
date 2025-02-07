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
  imports: [CommonModule, ReactiveFormsModule], 
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isCreatingUser: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService, 
    private router: Router
  ) {
    // Crear formulario reactivo
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.email]], 
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

    // Agregar o quitar validadores del email dinámicamente
    const emailControl = this.loginForm.get('email');
    if (this.isCreatingUser) {
      emailControl?.setValidators([Validators.required, Validators.email]);
    } else {
      emailControl?.clearValidators(); 
    }
    emailControl?.updateValueAndValidity(); 
    
   
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

    
      this.usuarioService.createUser(userData).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente:', response);

        
          alert('Usuario creado. Ahora puedes iniciar sesión.');
          this.isCreatingUser = false;
          this.loginForm.reset();
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          this.errorMessage = 'Error al crear usuario. Por favor, intentalo de nuevo.';
        },
      });
    } else {
      this.errorMessage = 'campos incorrectos';
    }
  }

  // Método que se ejecuta al enviar el formulario de Login
  onSubmit() {
    if (this.isCreatingUser) {
      
      if (this.loginForm.valid) {
        this.onCreateUser(); 
      } else {
        this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      }
    } else {
      if (this.loginForm.get('username')?.valid && this.loginForm.get('password')?.valid) {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;

      
        this.usuarioService.login(username, password).subscribe({
          next: (response) => {
            localStorage.setItem('userSessionId', response);
            localStorage.setItem('username', username);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error al iniciar sesión:', error);
            this.errorMessage =
              error.status === 401 ? 'Usuario o contraseña incorrectos' : 'Error de servidor';
          },
        });
      } else {
        this.errorMessage = 'Por favor, llena el nombre de usuario y la contraseña correctamente.';
      }
    }
  }
}