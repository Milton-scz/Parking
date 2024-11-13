import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { PlazasComponent } from './plazas/plazas.component';
import { TarifasComponent } from './tarifas/tarifas.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AbonadosComponent } from './abonados/abonados.component';
import { PlanesComponent } from './planes/planes.component';
import { RegistrosComponent } from './registros/registros.component';
import { ContratosComponent } from './contratos/contratos.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    PagesComponent,
    PlazasComponent,
    TarifasComponent,
    AbonadosComponent,
    PlanesComponent,
    RegistrosComponent,
    ContratosComponent,




  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatPaginatorModule
  ],
  exports: [
    DashboardComponent,
    UsuariosComponent,
    PlazasComponent,
    TarifasComponent,
    AbonadosComponent,
    PlanesComponent,
    RegistrosComponent,


  ]
})
export class PagesModule { }
