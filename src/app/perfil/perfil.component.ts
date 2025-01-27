import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true, 
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [FormsModule , ReactiveFormsModule], 
})
export class PerfilComponent {
  createUserForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private router: Router
  ){
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
    })
  }
  isCollapsed = false; 

  // Variables para los datos del formulario de usuario
  username: string = '';
  name: string = '';
  surname: string = '';

  mascotas = []; // Aquí estarán las mascotas creadas
  edadMascota: number | any;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
 // Calcula la edad de la mascota a partir de la fecha de nacimiento
 calcularEdad(event: any) {
  const fechaNacimiento = new Date(event.target.value); // Fecha de nacimiento seleccionada
  const hoy = new Date(); // Fecha actual

  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();

  // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

  this.edadMascota = edad; // Guarda la edad calculada en la variable
  console.log(`La edad  de la mascota es: ${this.edadMascota} años`);
}

    // Método para guardar los datos del usuario
    onSubmit() {
      if (this.createUserForm.valid) {
        const data = this.createUserForm.value;
        alert(`Datos de usuario guardados:\nNombre: ${data.name}\nApellidos: ${data.surname}`);
        return;
      }else {
        alert('Por favor, completa todos los campos antes de actualizar.');
    
      }
    }
  

}