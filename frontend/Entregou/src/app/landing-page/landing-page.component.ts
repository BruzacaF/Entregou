import { Component } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatFormField } from '@angular/material/form-field';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-landing-page',
  imports: [ MatGridList, MatGridTile, MatFormField, LoginFormComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {


}
