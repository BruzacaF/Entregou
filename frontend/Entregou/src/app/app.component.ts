import { Component, model, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { inject } from '@angular/core';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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


