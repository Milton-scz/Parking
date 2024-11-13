import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrearPlazaComponent } from 'src/app/pages/plazas/create.component';
import { EstacionamientoComponent } from 'src/app/pages/plazas/estacionamiento.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CrearPlazaComponent, EstacionamientoComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [CrearPlazaComponent,EstacionamientoComponent],
})
export class PlazasModule { }
