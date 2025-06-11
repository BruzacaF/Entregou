import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatGridTile } from '@angular/material/grid-list';
import { StorageData, PackageData,ClientData, clients, packages, regionalStorages, localStorages } from '../../../../../public/resources/staticResources/fakeDataMap';


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

  private storages: StorageData[] = [...regionalStorages, ...localStorages];
  private packages: PackageData[] = [...packages];
  private clients: ClientData[] = [...clients];
  cardsData: any[] = [];


  constructor() {
    this.cardsData = this.packageCardsData;
    
  
  }

  get packageCardsData() {
    return this.packages.map((pkg) => {
      return {
        id: pkg.id,
        client: clients.find(client => client.id === pkg.clientId)?.name || 'Cliente desconhecido',
        status: pkg.status,
        description: `Status: ${pkg.status}`,
        destination: regionalStorages.find(storage => storage.id === pkg.destinationStorageId)?.name || localStorages.find(storage => storage.id === pkg.destinationStorageId)?.name || 'Destino desconhecido',
        location: pkg.currentLocation ? `${pkg.currentLocation.lat}, ${pkg.currentLocation.long}` : 'Unknown Location'
      };
    });
  }
}
