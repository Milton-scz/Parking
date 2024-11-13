import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TarifasComponent } from './tarifas/tarifas.component';
import { PlazasComponent } from './plazas/plazas.component';
import { AbonadosComponent } from './abonados/abonados.component';
import { PlanesComponent } from './planes/planes.component';
import { RegistrosComponent } from './registros/registros.component';
import { EstacionamientoComponent } from './plazas/estacionamiento.component';
import { ContratosComponent } from './contratos/contratos.component';



const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: '',  data: { titulo: 'Gestionar Usuarios' },
        children: [
          { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },

        ]
      },
      { path: '',  data: { titulo: 'Gestionar Plazas' },
        children: [

          { path: 'plazas', component: PlazasComponent, data: { titulo: 'Plazas' } },
          { path: 'tarifas', component: TarifasComponent, data: { titulo: 'Tarifas' } },
          { path: 'abonados', component: AbonadosComponent, data: { titulo: 'Abonados' } },
          { path: 'planes', component: PlanesComponent, data: { titulo: 'Planes' } },
          { path: 'estacionamiento', component: EstacionamientoComponent, data: { titulo: 'Estacionamiento' } },

        ]
      },
      { path: '',  data: { titulo: 'Gestionar Registros' },
        children: [

          { path: 'registros', component: RegistrosComponent, data: { titulo: 'Registros' } },


        ]
      },
      { path: '',  data: { titulo: 'Gestionar Contratos' },
      children: [

        { path: 'contratos', component: ContratosComponent, data: { titulo: 'Contratos' } },


      ]
    },



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
export class PagesRoutingModule { }
