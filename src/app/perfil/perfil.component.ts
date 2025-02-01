import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mascota } from '../shared/models/mascota.model';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../global.service'; 


@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})

export class PerfilComponent implements OnInit { // Implementamos OnInit
  createUserForm: FormGroup;
  createPetForm: FormGroup;
  isCollapsed = false;
  mascotas: Mascota[] = [];
  errorMessage: string | null = null;

  defaultImages: string[] = [
    'default1.jpg',
    'default2.jpg',
    'default3.jpg',
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public globalService: GlobalService
  ) {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
    });

    this.createPetForm = this.fb.group({
      type: [''],
      breed: [''],
      petName: ['', [Validators.required]],
      dateBirth: [''],
      chip: ['', //[Validators.required, Validators.pattern('^[0-9]+$')]

      ],
    });

  }
  // Seleccionar una imagen de mascota
  
  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Imagen seleccionada:', file);
      // Puedes realizar más acciones como cargar el archivo al servidor o almacenarlo localmente.
    }
  }

  // Formulario de creación de mascota


  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  // Variables para los datos del formulario de mascota

  type: string = '';
  breed: string = '';
  petName: string = '';
  dateBirth: string = '';
  chip: string = '';

  // Ejecutar lógica al inicializar el componente
  ngOnInit(): void {
    alert(this.globalService.userSessionId);

    this.loadPets(); // Llama a la función automáticamente al cargar la pantalla
  }

  // Método para enviar una mascota al back
  createPet() {
    if (this.createPetForm.valid) {
      const petData = this.createPetForm.value;

      console.log('Datos enviados:', petData);

      // Llamada HTTP POST con los datos del formulario
      this.http.post<Mascota>('/api/v1/pets/create', petData).subscribe({
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
      alert('Por favor rellena todos los campos obligatorios antes de añadir');
      console.log('Errores en el formulario:', this.createPetForm.errors);
    }
  }
  

  loadPets() {
    // Llamada HTTP POST con los datos del formulario
    this.http.get<Mascota[]>('/api/v1/pets/'+this.globalService.userSessionId+'/find').subscribe({
      next: (response) => {
        this.mascotas = response;
        console.log('Las mascostas encontradas para este usuario son: ' + this.mascotas);
        
      },
      error: (error) => {
        console.error('Error al consultar las mascotas:', error);
        alert('Error al consultar las mascotas. Por favor, inténtalo de nuevo.');
      }
    });

  }
  // Variables para los datos del formulario de usuario
  username: string = '';
  name: string = '';
  surname: string = '';



  // Método para guardar los datos del usuario
  onSubmit() {
    if (this.createUserForm.valid) {
      const data = this.createUserForm.value;
      alert(`Datos de usuario guardados:\nNombre: ${data.name}\nApellidos: ${data.surname}`);
      return;
    } else {
      alert('Por favor, completa todos los campos antes de actualizar.');

    }
  }


}