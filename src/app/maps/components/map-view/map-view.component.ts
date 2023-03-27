import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { PlacesService, MapService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef
  @ViewChild('mapaImgUser')
  mapaImgUser!: ElementRef

  constructor(
    private placesService:PlacesService,
    private mapService: MapService
    
    ){ }

  ngAfterViewInit(): void {

      if(!this.placesService.useLocation) throw Error('No hay localizacion');

    const map = new Map({
        container: this.mapDivElement.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.placesService.useLocation, //pasamos la localizacion del place.service
        zoom: 14, // starting zoom
    });



  const popup = new Popup()
    .setHTML(`
      <h6>Aqui estoy</h6>
      <img #imgMapaUser src="../../assets/usuario-pequeno.png">
      <span>en este lugar</span>
    `);

    new Marker({color:'red'})
    .setLngLat(this.placesService.useLocation)
    .setPopup(popup)
    .addTo(map)
    
    this.mapService.setMap(map);
 } 
}
