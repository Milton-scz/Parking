import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createPlaza } from 'src/app/graphql/plazas/graphql.mutation';
import { Status } from 'src/app/model/plaza';

@Component({
  selector: 'app-plaza',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CrearPlazaComponent implements OnInit {
  plazaForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private apollo: Apollo, private fb: FormBuilder) {

    this.plazaForm = this.fb.group({
      numero: ['', Validators.required],
      largo: ['', Validators.required],
      ancho: ['', [Validators.required, Validators.min(1)]],
      estado: [null, Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.plazaForm.valid) {
      const { numero, largo, ancho, estado } = this.plazaForm.value;
      const plaza = {
        numero,
        largo,
        ancho,
        estado
      };

      this.createPlaza(plaza);
    }
  }

  createPlaza(plaza: { numero: number, largo: number, ancho: number, estado: Status }): void {
    this.apollo.mutate({
      mutation: createPlaza,
      variables: {
        plaza
      }
    }).subscribe({
      next: (response) => {
        this.successMessage = 'Plaza creada con éxito!';
        this.errorMessage = null;
        this.plazaForm.reset();
      },
      error: (error) => {
        this.errorMessage = 'Error al crear la plaza. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}
