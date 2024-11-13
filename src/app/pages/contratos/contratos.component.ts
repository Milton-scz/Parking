import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PageEvent } from '@angular/material/paginator';

import { ContratoService } from 'src/app/services/contrato.service';
import { getContracts } from 'src/app/graphql/smartcontracts/graphql.queries';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  contratos: any[] = [];
  totalContracts: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  paginaActual: number = 0;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  pageInfo: any = {};
  constructor(private apollo: Apollo,private contratoService: ContratoService) { }

  ngOnInit(): void {

    this.loadData();
  }


  loadData(): void {
    this.apollo.watchQuery({
      query: getContracts,
      variables: {
        page: this.paginaActual,
        size: this.pageSize
      }
    })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        this.contratos = result?.data?.getContracts?.items || [];
        this.pageInfo = result?.data?.getContracts?.pageInfo || {};
      });
  }


  actualizarContratos(): void {
    this.contratoService.getAllRentPlazas().subscribe({
      next: (data) => {
        console.log(data);
        this.contratos = data;
      },
      error: (error) => {
        console.error('Error al obtener los contratos', error);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.paginaActual = event.pageIndex;
    this.loadData();
  }

  onPageSizeChange(event: Event): void {
    const newSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pageSize = newSize;
    this.loadData();
  }

}
