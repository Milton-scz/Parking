import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard', icono: 'nav-icon fas fa-tachometer-alt',
      submenu: [
        { titulo: 'Gestion de Usuarios', icono: 'fa fa-cubes',
        submenu: [
          { titulo: 'Usuarios', url: 'usuarios', icono: 'fa fa-cube' },
        ] },
        {
          titulo: 'Gestion de Plazas', icono: 'fa fa-cubes',
          submenu: [
            { titulo: 'Tarifas', url: 'tarifas', icono: 'fa fa-cube' },
            { titulo: 'Plazas', url: 'plazas', icono: 'fa fa-cube' },
            { titulo: 'Abonados', url: 'abonados', icono: 'fa fa-tags' },
            { titulo: 'Planes', url: 'planes', icono: 'fa fa-tags' },
            { titulo: 'Estacionamiento', url: 'estacionamiento', icono: 'fa fa-tags' },
          ]
        },
        {
          titulo: 'Gestion de Registros', icono: 'fa fa-cubes',
          submenu: [
            { titulo: 'Registros', url: 'registros', icono: 'fa fa-cube' },

          ]
        },
        { titulo: 'Gestionar Contratos', url: 'contratos', icono: 'fa fa-file-contract' },
      ]
    }
  ];



}
