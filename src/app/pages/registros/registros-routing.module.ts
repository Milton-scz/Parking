import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrearRegistroEntradaComponent } from './entrada.component';
import { CrearRegistroSalidaComponent } from './salida.component';

import { PagesComponent } from '../pages.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: 'registros/create-entrada', component: CrearRegistroEntradaComponent, data: { titulo: 'Registrar Entrada' } },
      { path: 'registros/create-salida', component: CrearRegistroSalidaComponent, data: { titulo: 'Registrar Salida' } },

    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RegistrosRoutingModule { }
