import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrearUsuarioComponent } from 'src/app/pages/usuarios/create.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CrearUsuarioComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [CrearUsuarioComponent],
})
export class UsuariosModule { }
