import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createRegistro } from 'src/app/graphql/registros/graphql.mutation';
import { Tarifa } from 'src/app/model/tarifa';
import { Tipo_Registro } from 'src/app/model/registro';
import { getAllTarifas } from 'src/app/graphql/tarifas/graphql.queries';

@Component({
  selector: 'app-registro',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class CrearRegistroEntradaComponent implements OnInit {
  registroForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  tarifas: Tarifa[] = [];
  selectedTipo: any = null;
  constructor(private apollo: Apollo, private fb: FormBuilder) {

    this.registroForm = this.fb.group({
      placa: ['', [Validators.required]],
      tipoVehiculo: ['AUTO', Validators.required],
      hora: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadData();
    const now = new Date();
    const boliviaOffset = -4;
    const boliviaTime = new Date(now.getTime() + boliviaOffset * 60 * 60 * 1000);
    const currentDate = boliviaTime.toISOString().substring(0, 10); // Formato YYYY-MM-DD


    this.registroForm.patchValue({
      fecha: currentDate,
      tipo: 'ENTRADA'

    });

    // Actualizar la hora cada segundo
    setInterval(() => {
      const now = new Date();
      const boliviaTime = new Date(now.getTime() -24 * 60 * 60 * 1000);

      // Formatear la hora actual incluyendo segundos
      const currentTime = boliviaTime.toTimeString().substring(0, 8); // Formato HH:mm:ss


      this.registroForm.patchValue({
        hora: currentTime
      });
    }, 1000);


  }
  onTipoChange(): void {
    const selectedTipoId = this.registroForm.get('tipoVehiculo')?.value;
    this.selectedTipo = this.tarifas.find(tipoVehiculo => tipoVehiculo.tarifaId === selectedTipoId);

  }

  // Método para cargar las tarifas disponibles
  loadData(): void {
    this.apollo
      .watchQuery({
        query: getAllTarifas,
      })
      .valueChanges.subscribe((result: any) => {
        this.tarifas = result?.data?.getAllTarifas;
        console.log(this.tarifas);
      });
  }

  onSubmit(): void {

      const { placa, tipoVehiculo, hora, fecha, tipo } = this.registroForm.value;
      // Crear el objeto 'Registro' para pasar a la mutación
      const registro = {
        placa,
        tipoVehiculo:{
          tarifaId: this.selectedTipo.tarifaId,
          tipoVehiculo: this.selectedTipo.tipoVehiculo,
          precio_hora: this.selectedTipo.precio_hora,
          precio_dia: this.selectedTipo.precio_dia,
          precio_lavado: this.selectedTipo.precio_lavado
        },  // Esto es el objeto Tarifa
        hora,
        fecha,
        tipo
      };

      this.createRegistro(registro);

  }

  createRegistro(registro: { placa: string, tipoVehiculo: Tarifa, hora: string, fecha: string, tipo: Tipo_Registro }): void {
    this.apollo.mutate({
      mutation: createRegistro,  // Usar la mutación para crear un registro
      variables: {registro }
    }).subscribe({
      next: (response) => {
        this.successMessage = 'Registro creado con éxito!';
        this.errorMessage = null;
        this.registroForm.reset();
      },
      error: (error) => {
        this.errorMessage = 'Error al crear el registro. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}
