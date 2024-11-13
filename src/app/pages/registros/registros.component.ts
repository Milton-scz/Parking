import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { listaRegistros } from 'src/app/graphql/registros/graphql.queries';
import { deleteRegistro, createRegistro } from 'src/app/graphql/registros/graphql.mutation';
import { Registro } from 'src/app/model/registro';
import { Tarifa } from 'src/app/model/tarifa';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  registros: Registro[] = [];
  pageInfo: any = {};
  pageSize: number = 10;
  paginaActual: number = 0;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadData();
  }


  loadData(): void {
    this.apollo.watchQuery({
      query: listaRegistros,
      variables: {
        page: this.paginaActual,
        size: this.pageSize
      }
    })
    .valueChanges.subscribe((result: any) => {
      console.log(result);
      this.registros = result?.data?.getRegistros?.items || [];
      this.pageInfo = result?.data?.getRegistros?.pageInfo || {};
    });
  }


  async createRegistro( placa: string, tipoVehiculo: Tarifa, hora: string, fecha: string, tipo: string): Promise<void> {
    try {
      const response = await this.apollo.mutate({
        mutation: createRegistro,
        variables: { placa, tipoVehiculo, hora, fecha, tipo }
      }).toPromise();
      console.log('Registro creado:', response);
      this.successMessage = 'Registro creado con éxito!';
      this.loadData();
    } catch (error) {
      console.error('Error al crear registro:', error);
      this.errorMessage = 'Error al crear el registro';
    }
  }


  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.paginaActual = event.pageIndex;
    this.loadData();
  }


  deleteRegistro(registroId: number): void {
    this.apollo.mutate({
      mutation: deleteRegistro,
      variables: { registroId }
    }).subscribe({
      next: (response: any) => {
        if (response.data.deleteRegistro === true) {
          console.log('Registro eliminado:', response);
          this.successMessage = 'Registro eliminado con éxito!';
          this.registros = this.registros.filter(registro => registro.registroId !== registroId);
        } else {
          this.errorMessage = 'Error al eliminar el registro. Por favor, intente nuevamente.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar el registro. Por favor, intente nuevamente.';
        console.error('Error:', error);
      }
    });
  }


}
