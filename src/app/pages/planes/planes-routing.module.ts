import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrearPlanComponent } from './create.component';
import { PagesComponent } from '../pages.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: 'planes/create-plan', component: CrearPlanComponent, data: { titulo: 'Crear Plan' } },
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
export class PlanesRoutingModule { }
