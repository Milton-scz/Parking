import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrearAbonadoComponent } from './create.component';
import { PagesComponent } from '../pages.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: 'abonados/create-abonado', component: CrearAbonadoComponent, data: { titulo: 'Crear Abonado' } },
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
export class AbonadosRoutingModule { }
