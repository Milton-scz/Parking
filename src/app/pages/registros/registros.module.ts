import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrearRegistroEntradaComponent } from 'src/app/pages/registros/entrada.component';
import { CrearRegistroSalidaComponent } from 'src/app/pages/registros/salida.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CrearRegistroEntradaComponent, CrearRegistroSalidaComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [CrearRegistroEntradaComponent,CrearRegistroSalidaComponent],
})
export class RegistrosModule { }
