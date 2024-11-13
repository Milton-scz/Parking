import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PlazasRoutingModule } from './pages/plazas/plazas-routing.module';
import { TarifasRoutingModule } from './pages/tarifas/tarifas-routing.module';
import { ContratosRoutingModule } from './pages/contratos/contratos-routing.module';
import { UsuariosRoutingModule } from './pages/usuarios/usuarios-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { FormsModule } from '@angular/forms';
import { AbonadosRoutingModule } from './pages/abonados/abonados-routing.module';
import { PlanesRoutingModule } from './pages/planes/planes-routing.module';
import { RegistrosRoutingModule } from './pages/registros/registros-routing.module';


const routes:Routes=[

  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'**', component:NopageFoundComponent}

]

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
    PlazasRoutingModule,
    TarifasRoutingModule,
    UsuariosRoutingModule,
    AbonadosRoutingModule,
    PlanesRoutingModule,
    RegistrosRoutingModule,
    ContratosRoutingModule,
    FormsModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
