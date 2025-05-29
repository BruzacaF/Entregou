import { Component, model, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { inject } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatCard,MatCardContent, MatCardTitle, MatCardHeader,MatCardActions, MatCardSubtitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatGridList,MatGridTile, MatFormField,LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  readonly appName = 'Entregou';
  readonly appVersion = '1.0.0';
  readonly appDescription = 'Entregou é um aplicativo de gerenciamento de entregas que permite que você organize suas tarefas de forma eficiente e produtiva.';
  readonly title = 'Entregou';
  readonly themeService = inject(ThemeService);




}


