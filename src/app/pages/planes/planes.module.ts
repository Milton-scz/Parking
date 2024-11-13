import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrearPlanComponent } from 'src/app/pages/planes/create.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CrearPlanComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [CrearPlanComponent],
})
export class PlanesModule { }
