import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './app-map.component.html',
  styleUrl: './app-map.component.scss'
})



export class AppMapComponent implements OnInit {
  private map!: L.Map;
  private centroid: L.LatLngExpression = [-23.5505, -46.6333]; // São Paulo, Brasil

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const customIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FE7E11" width="32" height="32">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `),
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x.png' : '.png'), {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
      minZoom: 0
    });

    const markers = Array(5).fill(this.centroid).map(coord => [
      coord[0] + (Math.random() * 0.5) / 10,
      coord[1] + (Math.random() * 0.5) / 10
    ]).map(coord =>
      L.marker(coord as L.LatLngExpression, { icon: customIcon })
        .bindPopup(`Entrega ${Math.floor(Math.random() * 1000)}`)
    );

    markers.forEach(marker => marker.addTo(this.map));
    tiles.addTo(this.map);
  }

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }
}