import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { listaTarifas } from 'src/app/graphql/tarifas/graphql.queries';
import { deleteTarifa, createTarifa } from 'src/app/graphql/tarifas/graphql.mutation';
import { Tarifa } from 'src/app/model/tarifa';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  tarifas: Tarifa[] = [];
  pageInfo: any = {};
  pageSize: number = 10;
  paginaActual: number = 0;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.apollo.watchQuery({
      query: listaTarifas,
      variables: {
        page: this.paginaActual,
        size: this.pageSize
      }
    })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
      this.tarifas = result?.data?.getTarifas?.items || [];
      this.pageInfo = result?.data?.getTarifas?.pageInfo || {};
    });
  }

  async createTarifa(tipoVehiculo: string, precio_hora: number, precio_dia: number, precio_lavado: number): Promise<void> {
    try {
      const response = await this.apollo.mutate({
        mutation: createTarifa,
        variables: { tipoVehiculo, precio_hora, precio_dia, precio_lavado }
      }).toPromise();
      console.log('Tarifa creada:', response);
      this.successMessage = 'Tarifa creada con éxito!';
      this.loadData(); // Recargar la lista de tarifas
    } catch (error) {
      console.error('Error al crear tarifa:', error);
      this.errorMessage = 'Error al crear la tarifa';
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.paginaActual = event.pageIndex;
    this.loadData();
  }

  deleteTarifa(tarifaId: number): void {
    this.apollo.mutate({
      mutation: deleteTarifa,
      variables: { tarifaId }
    }).subscribe({
      next: (response: any) => {
        if (response.data.deleteTarifa === true) {
          console.log('Tarifa eliminada:', response);
          this.successMessage = 'Tarifa eliminada con éxito!';
          this.tarifas = this.tarifas.filter(tarifa => tarifa.tarifaId !== tarifaId);
        } else {
          this.errorMessage = 'Error al eliminar la tarifa. Por favor, intente nuevamente.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar la tarifa. Por favor, intente nuevamente.';
        console.error('Error:', error);
      }
    });
  }
}
