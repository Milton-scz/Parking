import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  createTarifa } from 'src/app/graphql/tarifas/graphql.mutation';

@Component({
  selector: 'app-tarifa',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CrearTarifaComponent implements OnInit {
  tarifaForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private apollo: Apollo, private fb: FormBuilder) {

    this.tarifaForm = this.fb.group({
      tipoVehiculo: ['', Validators.required],
      precio_hora: ['', [Validators.required, Validators.min(0)]],
      precio_dia: ['', [Validators.required, Validators.min(0)]],
      precio_lavado: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.tarifaForm.valid) {
      const { tipoVehiculo, precio_hora, precio_dia, precio_lavado } = this.tarifaForm.value;

      const tarifa = {
        tipoVehiculo,
        precio_hora,
        precio_dia,
        precio_lavado
      };

      this.createTarifa(tarifa);
    }
  }

  createTarifa(tarifa: { tipoVehiculo: string, precio_hora: number, precio_dia: number, precio_lavado: number }): void {
    this.apollo.mutate({
      mutation: createTarifa,
      variables: {
        tarifa
      }
    }).subscribe({
      next: (response) => {
        this.successMessage = 'Tarifa creada con éxito!';
        this.errorMessage = null;
        this.tarifaForm.reset();
      },
      error: (error) => {
        this.errorMessage = 'Error al crear la tarifa. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}
