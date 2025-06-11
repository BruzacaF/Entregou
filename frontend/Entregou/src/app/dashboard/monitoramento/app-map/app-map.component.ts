import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {
  StorageData,
  PackageData,
  packages,
  regionalStorages,
  localStorages
} from '../../../../../public/resources/staticResources/fakeDataMap';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './app-map.component.html',
  styleUrl: './app-map.component.scss'
})

export class AppMapComponent implements OnInit {
  private map!: L.Map;
  private centroid: L.LatLngExpression = [-7.1195, -34.8450]; // João Pessoa, PB
  private packageMarkers: PackageData[] = [];
  private regionalStorageMarkers: StorageData[] = [];



  private initMap(): void {
    this.map = L.map('map', {
    });

    // Set the initial view of the map to the centroid
    if (packages.length > 0 && packages[0].currentLocation) {
      this.centroid = [packages[0].currentLocation.lat, packages[0].currentLocation.long];
    }

    this.map.setView(this.centroid, 12);

    const packageMarkers = this.getinTrasitPackages(...packages);
    const regionalStorageMarkers = this.getRegionalStoragesLocations(...regionalStorages);
    const localStorageMarkers = this.getLocalStorageLocations(...localStorages);
    this.mountInTransitPackagesMarkers(...packageMarkers);
    this.mountRegionalStoragesMarkers(...regionalStorageMarkers);
    this.mountLocalStorageMarkers(...localStorageMarkers);
    // Add a tile layer to the map


    
  

    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x.png' : '.png'), {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
      minZoom: 0
    });




    packageMarkers.forEach(pkg => {
      if (pkg.currentLocation && pkg.currentLocation.lat && pkg.currentLocation.long) {
      const marker = L.marker([pkg.currentLocation.lat, pkg.currentLocation.long], { icon: driverIcon }).addTo(this.map);
      marker.bindPopup(`<b>${pkg.clientId}</b><br>Status: In Transit<br>Destination: ${pkg.destinationStorageId}<br>Package ID: ${pkg.id}`);
      }
    });

    regionalStorageMarkers.forEach(storage => {
      if (storage.location && storage.location.lat && storage.location.long) {
      const marker = L.marker([storage.location.lat, storage.location.long], { icon: storageIcon }).addTo(this.map);
      marker.bindPopup(`<b>${storage.name}</b><br>Type: Regional Storage`);
      }
    });

    localStorageMarkers.forEach(storage => {
      if (storage.location && storage.location.lat && storage.location.long) {
      const marker = L.marker([storage.location.lat, storage.location.long], { icon: localStorageIcon }).addTo(this.map);
      marker.bindPopup(`<b>${storage.name}</b><br>Type: Local Storage`);
      }
    });

    
    tiles.addTo(this.map);
  }

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }



  getinTrasitPackages(...packages: PackageData[]): PackageData[] {
    return packages.filter((data: PackageData) => data.status === 'in-transit').slice(0, 10);
  }

  getRegionalStoragesLocations(...Storages: StorageData[]): StorageData[] {
    return Storages.filter(storage => storage.location !== undefined && storage.location.lat !== undefined && storage.location.long !== undefined);
  }

  getLocalStorageLocations(...Storages: StorageData[]): StorageData[] {
    return Storages.filter(storage => storage.location !== undefined && storage.location.lat !== undefined && storage.location.long !== undefined);
  }

  mountInTransitPackagesMarkers(...packages: PackageData[]): void {
    packages.forEach((packages: PackageData) => {
      if (packages.currentLocation && packages.currentLocation.lat && packages.currentLocation.long) {
        const marker = L.marker([packages.currentLocation.lat, packages.currentLocation.long], { icon: driverIcon }).addTo(this.map);
        marker.bindPopup(`<b>${packages.clientId}</b><br>Status: In Transit<br>Destination: ${packages.destinationStorageId}<br>Package ID: ${packages.id}`);
        marker.on('click', () => {
          if (packages.currentLocation && packages.currentLocation.lat && packages.currentLocation.long) {
            this.map.setView([packages.currentLocation.lat, packages.currentLocation.long], 14);
          }
        });
      }
    });
  }

  mountRegionalStoragesMarkers(...Storages: StorageData[]): void {
    Storages.forEach((storage: StorageData) => {
      if (storage.location && storage.location.lat && storage.location.long) {
        const marker = L.marker([storage.location.lat, storage.location.long], { icon: storageIcon }).addTo(this.map);
        marker.bindPopup(`<b>${storage.name}</b><br>Type: Regional Storage`);
      }
    });
  }

  mountLocalStorageMarkers(...Storages: StorageData[]): void {
    Storages.forEach((storage: StorageData) => {
      if (storage.location && storage.location.lat && storage.location.long) {
        const marker = L.marker([storage.location.lat, storage.location.long], { icon: localStorageIcon }).addTo(this.map);
        marker.bindPopup(`<b>${storage.name}</b><br>Type: Local Storage`);
      }
    });
  }






}

const storageIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FE7E11" width="40" height="40">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});


const localStorageIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6B7280" width="24" height="24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24]
});


const driverIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FE7E11" width="32" height="32">
      <path d="M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3C3,18.66 4.34,20 6,20C7.66,20 9,18.66 9,17H15C15,18.66 16.34,20 18,20C19.66,20 21,18.66 21,17H23V12L20,8M6,18.5C5.17,18.5 4.5,17.83 4.5,17C4.5,16.17 5.17,15.5 6,15.5C6.83,15.5 7.5,16.17 7.5,17C7.5,17.83 6.83,18.5 6,18.5M18,18.5C17.17,18.5 16.5,17.83 16.5,17C16.5,16.17 17.17,15.5 18,15.5C18.83,15.5 19.5,16.17 19.5,17C19.5,17.83 18.83,18.5 18,18.5M17,12V9.5H19.5L21.46,12H17Z"/>
      </svg>
    `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});
