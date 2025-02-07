import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { Mascota } from '../shared/models/mascota.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],   
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
})
export class PerfilComponent implements OnInit { 
  createUserForm: FormGroup;
  createPetForm: FormGroup;
  isCollapsed = false;
  mascotas: Mascota[] = [];
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Crear formulario de usuario
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
    });

    // Crear formulario de mascota
    this.createPetForm = this.fb.group({
      type: [''],
      breed: [''],
      petName: ['', [Validators.required]],
      dateBirth: [''],
      chip: [''], // [Validators.required, Validators.pattern('^[0-9]+$')]
      photo: [''],
    });
  }

  // Variables para los datos del formulario de mascota
  type: string = '';
  breed: string = '';
  petName: string = '';
  dateBirth: string = '';
  chip: string = '';
  photo: string | undefined;

  // Variables del usuario
  username: string = ''; 


  // Ejecutar lógica al inicializar el componente
  ngOnInit(): void {
    this.loadUserData();
    console.log('ID de sesión actual:', localStorage.getItem('userSessionId'));
    this.loadPets(); 
  }

  // Carga los datos del usuario desde el localStorage
  private loadUserData(): void {
    this.username = localStorage.getItem('username') || ''; 
  }

  // Seleccionar una imagen de mascota
  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Imagen seleccionada:', file);
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; 
        
        this.createPetForm.patchValue({ photo: base64String });
  
        console.log('Imagen en Base64:', base64String);
      };

      reader.onerror = (error) => {
        console.error('Error al leer el archivo: ', error);
      };

      reader.readAsDataURL(file); 
    }
  }

  // Método para enviar una mascota al servidor
  createPet(): void {
    if (this.createPetForm.valid) {
      const petData = this.createPetForm.value;

      console.log('Datos enviados:', petData);

      // Llamada HTTP POST para crear una nueva mascota
      this.http.post<Mascota>('/api/v1/pets/'+localStorage.getItem('userSessionId')+'/create', petData).subscribe({
        next: (response) => {
          this.mascotas.push(response);
          alert('La mascota ha sido creada exitosamente');
          this.createPetForm.reset();
          this.isCollapsed = true;
        },
        error: (error) => {
          console.error('Error al crear la mascota:', error);
          alert('Error al crear la mascota. Por favor, inténtalo de nuevo.');
        }
      });
    } else {
      alert('Por favor rellena todos los campos obligatorios antes de añadir.');
      console.log('Errores en el formulario:', this.createPetForm.errors);
    }
  }

  // Mostrar/ocultar formulario (colapsar el formulario)
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // Cargar lista de mascotas del usuario
  loadPets(): void {
    const userSessionId = localStorage.getItem('userSessionId');
    
    if (!userSessionId) {
      console.error('No hay ID de sesión en localStorage. Redirigiendo al login...');
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<Mascota[]>(`/api/v1/pets/${userSessionId}/find`).subscribe({
      next: (response) => {
        this.mascotas = response;
        console.log('Las mascotas encontradas para este usuario son:', this.mascotas);
      },
      error: (error) => {
        console.error('Error al consultar las mascotas:', error);
      }
    });
  }

  // Método para guardar los datos del usuario
  onSubmit(): void {
    if (this.createUserForm.valid) {
      const data = this.createUserForm.value;
      alert(`Datos de usuario guardados:\nNombre: ${data.name}\nApellidos: ${data.surname}`);
    } else {
      alert('Por favor, completa todos los campos antes de actualizar.');
    }
  }
}