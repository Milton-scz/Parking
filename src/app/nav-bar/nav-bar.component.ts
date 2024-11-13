import { Component } from '@angular/core';
import { NavigationService } from '../services/NavigationService';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(public navigation: NavigationService) { }
  goBack(): void {
    this.navigation.goBack();
  }

  goNext(): void {
    this.navigation.goNext();
  }
}
