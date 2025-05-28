import { Component, model, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ThemeService } from './services/theme.service';
import { inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatToolbarModule],
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


