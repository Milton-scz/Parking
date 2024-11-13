import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { listaPlazas } from 'src/app/graphql/plazas/graphql.queries';
import { deletePlaza } from 'src/app/graphql/plazas/graphql.mutation';
import { Plaza , Status} from 'src/app/model/plaza';
import { PageEvent } from '@angular/material/paginator';
import { createPlaza } from 'src/app/graphql/plazas/graphql.mutation';


@Component({
  selector: 'app-plazas',
  templateUrl: './plazas.component.html',
  styleUrls: ['./plazas.component.css']
})
export class PlazasComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  plazas: Plaza[] = [];
  pageInfo: any = {};
  pageSize: number = 10;
  paginaActual: number = 0;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.apollo.watchQuery({
      query: listaPlazas,
      variables: {
        page: this.paginaActual,
        size: this.pageSize
      }
    })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
      this.plazas = result?.data?.getPlazas?.items || [];
      this.pageInfo = result?.data?.getPlazas?.pageInfo || {};
    });
  }




  async createPlaza(numero: number, largo: number, ancho: number, estado: Status): Promise<void> {
    try {
      const response = await this.apollo.mutate({
        mutation: createPlaza,
        variables: {
          numero,
          largo,
          ancho,
          estado,
        }
      }).toPromise();
      console.log('Plaza creado:', response);
    } catch (error) {
      console.error('Error al crear plaza:', error);
      throw error;
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.paginaActual = event.pageIndex;
    this.loadData();
  }
  deletePlaza(plazaId: number): void {
    this.apollo.mutate({
      mutation: deletePlaza,
      variables: {
        plazaId:plazaId,
      }
    }).subscribe({
      next: (response: any) => {
        if (response.data.deletePlaza==true) {
          console.log(response);
          this.successMessage = 'Plaza eliminado con éxito!';
          this.errorMessage = null;
          this.plazas = this.plazas.filter(plaza => plaza.plazaId !== plazaId);
        } else {
          console.log(response);
          this.errorMessage = 'Error al eliminar el cliente. Por favor, intente nuevamente.';
          this.successMessage = null;
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar el cliente. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}


