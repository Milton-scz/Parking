import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createRegistro } from 'src/app/graphql/registros/graphql.mutation';
import { getAllRegistros } from 'src/app/graphql/registros/graphql.queries';
import { Tarifa } from 'src/app/model/tarifa';
import { Registro, Tipo_Registro } from 'src/app/model/registro';
import { getAllVehiculos } from 'src/app/graphql/vehiculos/graphql.queries';
import { Status, Vehiculo } from 'src/app/model/vehiculo';
import { Plaza } from 'src/app/model/plaza';
@Component({
  selector: 'app-registro',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class CrearRegistroSalidaComponent implements OnInit {
  registroForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  tarifas: Tarifa[] = [];
  vehiculos: Vehiculo[] = [];
  selectedTipo: Tarifa | null = null;
  horaEntrada: string = "";
  fechaEntrada: string = "";
  tiempoTranscurrido: string = "";
  lavadoSeleccionado: boolean = false;
  registros: Registro[] = [];
  cobroParking: number = 0;
  montoTotal: number = 0;
  tiempoTranscurridoNumero: number = 0;
  precio_lavado: number = 0;
  selectedRegistro: any | null = null;
  numeroPlaza: number = 0;


  constructor(private apollo: Apollo, private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      placa: ['', [Validators.required]],
      tipoVehiculo: ['', Validators.required],
      horaIngreso: ['', [Validators.required]],
      fechaIngreso: ['', [Validators.required]],
      horaSalida: ['', [Validators.required]],
      fechaSalida: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      tiempoTranscurrido: ['', [Validators.required]],
      cobroParking: [0, [Validators.required]],
      precio_lavado: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.loadDataVehiculos();
    const now = new Date();
    const boliviaOffset = -4;
    const boliviaTime = new Date(now.getTime() + boliviaOffset * 60 * 60 * 1000);
    const currentDate = boliviaTime.toISOString().substring(0, 10);

    this.registroForm.patchValue({
      fechaSalida: currentDate,
      tipo: 'SALIDA'
    });

    setInterval(() => {
      const now = new Date();
      const boliviaTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const currentTime = boliviaTime.toTimeString().substring(0, 8);
      this.registroForm.patchValue({ horaSalida: currentTime });
    }, 1000);
  }

  loadData(): void {
    this.apollo
      .watchQuery({
        query: getAllRegistros,
      })
      .valueChanges.subscribe((result: any) => {
        this.registros = result?.data?.getAllRegistros;
      });
  }

  loadDataVehiculos(): void {
    this.apollo
      .watchQuery({
        query: getAllVehiculos,
      })
      .valueChanges.subscribe((result: any) => {
        this.vehiculos = result?.data?.getAllVehiculos;
      });
  }



  onLavadoChange(seleccionado: boolean): void {
    this.lavadoSeleccionado = seleccionado;
    if (this.lavadoSeleccionado) {
      this.montoTotal = this.montoTotal + this.precio_lavado;
    } else {
      this.montoTotal = this.montoTotal - this.precio_lavado;
    }
  }

  buscarRegistro(): void {
    const placa = this.registroForm.get('placa')?.value;

    if (!placa) {
      this.errorMessage = 'Por favor, ingrese una placa para buscar.';
      this.successMessage = null;
      return;
    }

    this.selectedRegistro = this.registros.find(registro =>
      registro.placa === placa &&
      this.vehiculos.some(vehiculo =>
        vehiculo.placa === placa && vehiculo.estado === Status.ADENTRO
      )
    );


    if (this.selectedRegistro) {
      this.registroForm.patchValue({
        tipoVehiculo: this.selectedRegistro.tipoVehiculo?.tipoVehiculo,
        horaIngreso: this.selectedRegistro.hora,
        fechaIngreso: this.selectedRegistro.fecha,
        cobroParking: this.selectedRegistro.tipoVehiculo.precio_hora,
        precio_lavado: this.selectedRegistro.tipoVehiculo.precio_lavado
      });
      this.numeroPlaza = this.selectedRegistro.plaza.numero,
      this.calculateTiempoTranscurrido(this.selectedRegistro.hora, this.selectedRegistro.fecha);
      this.precio_lavado = this.selectedRegistro.tipoVehiculo.precio_lavado;
      this.cobroParking = this.selectedRegistro.tipoVehiculo.precio_hora;
      this.calcularCobroTotal();

      this.errorMessage = null;
      this.successMessage = 'Registro encontrado y cargado en el formulario.';
    } else {
      this.errorMessage = 'No se encontró ningún registro con esa placa.';
      this.successMessage = null;
    }
  }

  calculateTiempoTranscurrido(horaIngreso: string, fechaIngreso: string): void {
    if (!horaIngreso || !fechaIngreso) {
      this.tiempoTranscurrido = 'Las horas o fechas de ingreso no son válidas';
      return;
    }

    const now = new Date();
    const [horaIngresoHoras, horaIngresoMinutos] = horaIngreso.split(":").map(Number);
    const [year, month, day] = fechaIngreso.split("-").map(Number);
    const fechaIngresoDate = new Date(year, month - 1, day, horaIngresoHoras, horaIngresoMinutos, 0, 0);

    const diferenciaMs = now.getTime() - fechaIngresoDate.getTime();

    if (diferenciaMs < 0) {
      this.tiempoTranscurrido = 'La fecha/hora de ingreso no puede ser mayor que la fecha/hora actual';
      return;
    }

    const diferenciaHoras = Math.floor(diferenciaMs / (1000 * 60 * 60));
    const diferenciaMinutos = Math.floor((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60));

    this.tiempoTranscurrido = `${diferenciaHoras} HORA(S) y ${diferenciaMinutos} MINUTO(S)`;
    this.tiempoTranscurridoNumero = diferenciaHoras;
  }

  calcularCobroTotal(): void {
    const cobroBase = this.cobroParking;
    const cobroLavado = this.lavadoSeleccionado ? (this.precio_lavado || 0) : 0;
    this.montoTotal = (cobroBase * this.tiempoTranscurridoNumero) + cobroLavado;
  }

  onSubmit(): void {
    if (!this.selectedRegistro || !this.selectedRegistro.tipoVehiculo || !this.selectedRegistro.plaza) {
        this.errorMessage = 'Error: La información del registro seleccionado no está completa.';
        return;
    }

    const { placa, tipoVehiculo, horaSalida, fechaSalida, tipo } = this.registroForm.value;

    const registro = {
        placa,
        tipoVehiculo: {
            tarifaId: this.selectedRegistro.tipoVehiculo.tarifaId,
            tipoVehiculo: this.selectedRegistro.tipoVehiculo.tipoVehiculo,
            precio_hora: this.selectedRegistro.tipoVehiculo.precio_hora,
            precio_dia: this.selectedRegistro.tipoVehiculo.precio_dia,
            precio_lavado: this.selectedRegistro.tipoVehiculo.precio_lavado
        },
        hora: horaSalida,
        fecha: fechaSalida,
        tipo,
        plaza: {
            plazaId: this.selectedRegistro.plaza.plazaId,
            numero: this.selectedRegistro.plaza.numero,
            estado: this.selectedRegistro.plaza.estado,
            largo: this.selectedRegistro.plaza.largo,
            ancho:this.selectedRegistro.plaza.ancho
        }
    };

    this.createRegistro(registro);
}


  createRegistro(registro: { placa: string, tipoVehiculo: Tarifa, hora: string, fecha: string, tipo: Tipo_Registro,plaza:Plaza }): void {
    this.apollo.mutate({
      mutation: createRegistro,
      variables: { registro }
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
