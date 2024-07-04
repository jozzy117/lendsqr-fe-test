import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public layoutService: LayoutService) { }

  toggleMbSidebar() {
    this.layoutService.toggleMbSidenav();
  }

}
