import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { listaPlanes } from 'src/app/graphql/planes/graphql.queries';
import { deletePlan, createPlan } from 'src/app/graphql/planes/graphql.mutation';
import { Plan } from 'src/app/model/plan';
import { PageEvent } from '@angular/material/paginator';
import { DetallePlan } from 'src/app/model/detallePlan';



@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  planes: Plan[] = [];
  pageInfo: any = {};
  pageSize: number = 10;
  paginaActual: number = 0;
  planForm!: FormGroup;
  detallesPlan: DetallePlan[]=[]; // Inicializado como null
  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apollo.watchQuery({
      query: listaPlanes,
      variables: {
        page: this.paginaActual,
        size: this.pageSize
      }
    })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        this.planes = result?.data?.getPlanes?.items || [];
        this.pageInfo = result?.data?.getPlanes?.pageInfo || {};
      });
  }

  async createPlan(plan: { abonado: string, montoSemanaMes: number, duracion: number, tipo: string, fechaInicio: string, montoTotal: number }): Promise<void> {
    try {
      const response = await this.apollo.mutate({
        mutation: createPlan,
        variables: { ...plan }
      }).toPromise();
      console.log('Plan creado:', response);
      this.successMessage = 'Plan creado con éxito!';
      this.loadData();  // Recargar la lista de planes
    } catch (error) {
      console.error('Error al crear plan:', error);
      this.errorMessage = 'Error al crear el plan';
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.paginaActual = event.pageIndex;
    this.loadData();
  }

  deletePlan(planId: number): void {
    this.apollo.mutate({
      mutation: deletePlan,
      variables: { planId }
    }).subscribe({
      next: (response: any) => {
        if (response.data.deletePlan === true) {
          console.log('Plan eliminado:', response);
          this.successMessage = 'Plan eliminado con éxito!';
          this.planes = this.planes.filter(plan => plan.planId !== planId);
        } else {
          this.errorMessage = 'Error al eliminar el plan. Por favor, intente nuevamente.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar el plan. Por favor, intente nuevamente.';
        console.error('Error:', error);
      }
    });
  }
  openModal(plan: Plan): void {
    this.detallesPlan = plan.detalle;
    console.log('Detalles:', plan.detalle);

  }

}
