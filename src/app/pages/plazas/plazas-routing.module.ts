import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrearPlazaComponent } from './create.component';
import { PagesComponent } from '../pages.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: 'plazas/create-plaza', component: CrearPlazaComponent, data: { titulo: 'Crear Plaza' } },
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
export class PlazasRoutingModule { }
