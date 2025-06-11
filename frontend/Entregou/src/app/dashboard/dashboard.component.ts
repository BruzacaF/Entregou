import { Component } from '@angular/core';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    
    DashboardNavbarComponent,
    MatSidenavModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
