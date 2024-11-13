import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createAbonado } from 'src/app/graphql/abonados/graphql.mutation';

@Component({
  selector: 'app-crear-abonado',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CrearAbonadoComponent implements OnInit {
  abonadoForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private apollo: Apollo, private fb: FormBuilder) {

    this.abonadoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      placa: ['', [Validators.required]],
      direccion: ['', Validators.required],
      celular: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.abonadoForm.valid) {
      const { nombre, cedula, placa, direccion, celular } = this.abonadoForm.value;

      const abonado = {
        nombre,
        cedula,
        placa,
        direccion,
        celular
      };

      this.createAbonado(abonado);
    }
  }

  createAbonado(abonado: { nombre: string, cedula: string, placa: string, direccion: string, celular: string }): void {
    this.apollo.mutate({
      mutation: createAbonado,
      variables: {
        abonado
      }
    }).subscribe({
      next: (response) => {
        this.successMessage = 'Abonado creado con éxito!';
        this.errorMessage = null;
        this.abonadoForm.reset();
      },
      error: (error) => {
        this.errorMessage = 'Error al crear el abonado. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}
