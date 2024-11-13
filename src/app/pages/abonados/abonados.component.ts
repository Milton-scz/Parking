import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { listaAbonados } from 'src/app/graphql/abonados/graphql.queries';
import { deleteAbonado, createAbonado } from 'src/app/graphql/abonados/graphql.mutation';
import { Abonado } from 'src/app/model/abonado';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-abonados',
  templateUrl: './abonados.component.html',
  styleUrls: ['./abonados.component.css']
})
export class AbonadosComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  abonados: Abonado[] = [];
  pageInfo: any = {};
  pageSize: number = 10;
  paginaActual: number = 0;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadData();
  }


  loadData(): void {
    this.apollo.watchQuery({
      query: listaAbonados,
      variables: {
        page: this.paginaActual,
        size: this.pageSize
      }
    })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        this.abonados = result?.data?.getAbonados?.items || [];
        this.pageInfo = result?.data?.getAbonados?.pageInfo || {};
      });
  }


  async createAbonado(abonadoId: number, cedula: string, placa: string, direccion: string, celular: string): Promise<void> {
    try {
      const response = await this.apollo.mutate({
        mutation: createAbonado,
        variables: { abonadoId, cedula, placa, direccion, celular }
      }).toPromise();
      console.log('Abonado creado:', response);
      this.successMessage = 'Abonado creado con éxito!';
      this.loadData();
    } catch (error) {
      console.error('Error al crear abonado:', error);
      this.errorMessage = 'Error al crear el abonado';
    }
  }


  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.paginaActual = event.pageIndex;
    this.loadData();
  }


  deleteAbonado(abonadoId: number): void {
    this.apollo.mutate({
      mutation: deleteAbonado,
      variables: { abonadoId }
    }).subscribe({
      next: (response: any) => {
        if (response.data.deleteAbonado === true) {
          console.log('Abonado eliminado:', response);
          this.successMessage = 'Abonado eliminado con éxito!';
          this.abonados = this.abonados.filter(abonado => abonado.abonadoId !== abonadoId);
        } else {
          this.errorMessage = 'Error al eliminar el abonado. Por favor, intente nuevamente.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar el abonado. Por favor, intente nuevamente.';
        console.error('Error:', error);
      }
    });
  }
}
