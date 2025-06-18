import { Component } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-landing-page',
  imports: [ MatGridList, MatGridTile, LoginFormComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})

export class LandingPageComponent {
  constructor() 
  {
    console.log('LandingPageComponent initialized');
   }


}
