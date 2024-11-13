import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrearAbonadoComponent } from 'src/app/pages/abonados/create.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CrearAbonadoComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [CrearAbonadoComponent],
})
export class AbonadosModule { }
