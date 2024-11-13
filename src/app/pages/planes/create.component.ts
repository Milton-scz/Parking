import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createPlan } from 'src/app/graphql/planes/graphql.mutation';
import { getAllAbonados } from 'src/app/graphql/abonados/graphql.queries';
import { Abonado } from 'src/app/model/abonado';
import { DetallePlan } from 'src/app/model/detallePlan';
import { ContratoService } from 'src/app/services/contrato.service';
import { createSmartContract } from 'src/app/graphql/smartcontracts/graphql.mutation';

@Component({
  selector: 'app-plan',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CrearPlanComponent implements OnInit {
  isLoading: boolean = false;
  abonados: Abonado[] = [];
  planForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedAbonado: any = null;
  detalle: DetallePlan[] = [];

  constructor(private apollo: Apollo, private fb: FormBuilder,private contratoService: ContratoService) {
    this.planForm = this.fb.group({
      abonado: "",
      montoSemanaMes: ['', [Validators.required, Validators.min(1)]],
      duracion: ['', [Validators.required, Validators.min(1)]],
      tipo: ['SEMANAL'],
      fechaInicio: ['', Validators.required],
      placa: ['', Validators.required],
      montoTotal: ['', Validators.required],
      nombreAbonado: ['', Validators.required],
      cedulaAbonado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apollo
      .watchQuery({
        query: getAllAbonados,
      })
      .valueChanges.subscribe((result: any) => {
        this.abonados = result?.data?.getAllAbonados;
        console.log(this.abonados);
      });
  }

  onSubmit(): void {
    this.isLoading = true;
    const {  montoSemanaMes, duracion, tipo, fechaInicio, montoTotal } = this.planForm.value;
    const plan = {
      abonado: {
        abonadoId: this.selectedAbonado.abonadoId,
        nombre: this.selectedAbonado.nombre,
        cedula: this.selectedAbonado.cedula,
        placa: this.selectedAbonado.placa,
        direccion: this.selectedAbonado.direccion,
        celular: this.selectedAbonado.celular
      },
      montoSemanaMes,
      duracion,
      tipo,
      fechaInicio ,
      montoTotal,
      detalle :this.detalle
    };

    this.createPlan(plan);
  }

  onAbonadoChange(): void {
    const selectedAbonadoId = this.planForm.get('abonado')?.value;
    this.selectedAbonado = this.abonados.find(abonado => abonado.abonadoId === selectedAbonadoId);
    if (this.selectedAbonado) {
      this.planForm.patchValue({
        nombreAbonado: this.selectedAbonado.nombre,
        cedulaAbonado: this.selectedAbonado.cedula,
      });
    }
  }

  createPlan(plan: { abonado: Abonado, montoSemanaMes: number, duracion: number, tipo: string, fechaInicio: string, montoTotal: number, detalle: DetallePlan[] }): void {
    this.apollo.mutate({
      mutation: createPlan,
      variables: { plan }
    }).subscribe({
      next: (response) => {
        this.addContract(plan.abonado.cedula, "0",plan.montoSemanaMes.toString(),plan.duracion.toString(), plan.tipo, plan.fechaInicio, plan.montoTotal.toString(), plan.detalle.toString());

        this.errorMessage = null;
        this.planForm.reset();
        this.detalle = [];
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al crear el plan. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }




  addContract(cedulaAbonado: string, numberPlaza: string, montoSemanaMes: string, duracion: string, tipo: string, fechaInicio: string, montoTotal: string, detalle: string): void {
    const data = { cedulaAbonado, numberPlaza, montoSemanaMes, duracion, tipo, fechaInicio, montoTotal, detalle };

    this.contratoService.registerRent(data).subscribe({
      next: (response) => {
        console.log("Contrato registrado en la blockchain con éxito:", response);
        if (response && response.trxhash) {
          this.createContract(response.trxhash);
        } else {
          console.error("Error: `trxhash` no disponible en la respuesta.");
        }
      },
      error: (error) => {
        console.error("Error al crear el contrato en la blockchain:", error);
      }
    });
}

createContract(trxHash: string): void {
    this.apollo.mutate({
      mutation: createSmartContract,
      variables: { contract: { trxHash } }
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Contrato creado con éxito en el backend!';
        this.errorMessage = null;
        this.planForm.reset();
        this.detalle = [];
        console.log('Respuesta del servidor:', response);
      },
      error: (error) => {
        this.errorMessage = 'Error al crear el contrato en el backend. Intente nuevamente.';
        this.successMessage = null;
        console.error('Error en Apollo:', error);
      }
    });
}

  onCalculate(): void {
    const montoSemanaMes = this.planForm.get('montoSemanaMes')?.value;
    const duracion = this.planForm.get('duracion')?.value;
    const tipo = this.planForm.get('tipo')?.value;
    let montoTotal = 0;

    if (tipo === 'SEMANAL') {
      montoTotal = montoSemanaMes * duracion;  // Calculo para semanal
    } else if (tipo === 'MENSUAL') {
      montoTotal = montoSemanaMes * duracion;  // Calculo para mensual
    }

    this.planForm.patchValue({
      montoTotal
    });
    this.calculatePayments();
  }

 calculatePayments(): void {
  const tipo = this.planForm.get('tipo')?.value;
  const montoSemanaMes = this.planForm.get('montoSemanaMes')?.value;
  const duracion = this.planForm.get('duracion')?.value;
  const fechaInicio = this.planForm.get('fechaInicio')?.value;

  let currentDate = new Date(fechaInicio);
  if (isNaN(currentDate.getTime())) {
    console.error('Fecha de inicio inválida');
    return;
  }


  const montoPorSemana = tipo === 'SEMANAL' ? montoSemanaMes : montoSemanaMes / duracion;
  this.detalle = [];
  for (let i = 0; i < duracion; i++) {
    if (tipo === 'SEMANAL') {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (tipo === 'MENSUAL') {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    const detallePlan = new DetallePlan(i + 1,new Date(currentDate).toString(),montoPorSemana);
    this.detalle.push(detallePlan);
  }

  console.log('Pagos calculados:', this.detalle);
}





}
