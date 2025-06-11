import { Component } from '@angular/core';
import linksNavbar from '../../../../public/resources/staticResources/links';
import { MatIconModule } from '@angular/material/icon';
import { MatList } from '@angular/material/list';
import { MatDivider } from '@angular/material/list';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard-navbar',
  imports: [MatIconModule,MatList, MatDivider, RouterModule],
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.scss'
})


export class DashboardNavbarComponent {

  links = linksNavbar;

  




  constructor() { }
  isActive(linkRoute: string): boolean {
    return window.location.pathname === linkRoute;
  }

}
