import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { AppMapComponent } from './app-map/app-map.component';
import { MapCardsComponent } from './map-cards/map-cards.component';

@Component({
  selector: 'app-monitoramento-tabela',
  imports: [MatListModule, MatGridListModule, CommonModule, RouterModule, AppMapComponent, MapCardsComponent],
  templateUrl: './monitoramento.component.html',
  styleUrl: './monitoramento.component.scss'
})
export class MonitoramentoComponent {

}
