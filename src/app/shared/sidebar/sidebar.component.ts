import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private sideBarServices: SidebarService, private router: Router) {
    this.menuItems = this.sideBarServices.menu;
  }

  ngOnInit(): void {
    // Al cargar el componente, puedes asegurarte de que todos los submenús estén cerrados al inicio
    this.menuItems.forEach(item => item.open = false);
  }

  // Método para alternar el estado de apertura del submenú
  toggleSubmenu(item: any): void {
    item.open = !item.open;  // Cambia el estado de abierto/cerrado
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
