import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrearTarifaComponent } from 'src/app/pages/tarifas/create.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CrearTarifaComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [CrearTarifaComponent],
})
export class TarifasModule { }
