import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '../pages.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [

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
export class ContratosRoutingModule { }
