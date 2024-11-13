import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createUser } from 'src/app/graphql/users/graphql.mutation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importa el enumerado UserRole
import { UserRole } from 'src/app/model/UserRole';

@Component({
  selector: 'app-usuarios',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  userForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Define una lista de roles válidos para el select del formulario
  roles = Object.values(UserRole);

  constructor(private apollo: Apollo, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: [null, Validators.required], // Inicializa el campo role como null
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      const { name,cedula, telefono, direccion, email, password, role } = this.userForm.value;
      this.createUser(name,cedula, telefono,direccion, email, password, role);
    }
  }

  createUser(name: string,cedula: string,telefono: string,direccion: string, email: string, password: string, role: UserRole): void {
    this.apollo.mutate({
      mutation: createUser,
      variables: {
        name,
        cedula,
        telefono,
        direccion,
        email,
        password,
        role
      }
    }).subscribe({
      next: (response) => {
        this.successMessage = 'Usuario creado con éxito!';
        this.errorMessage = null;
        this.userForm.reset();
      },
      error: (error) => {
        this.errorMessage = 'Error al crear el usuario. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}
