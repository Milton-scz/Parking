import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/NavigationService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(public navigation: NavigationService) {
    this.navigation.startSaveHistory();
  }

}
