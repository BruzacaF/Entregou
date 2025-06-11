import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatGridTile } from '@angular/material/grid-list';


@Component({
  selector: 'map-cards',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatGridTile
  ],
  templateUrl: './map-cards.component.html',
  styleUrl: './map-cards.component.scss'
})
export class MapCardsComponent {

  

  constructor() {
    
  }

}
