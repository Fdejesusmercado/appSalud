import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { Map, Popup, Marker } from 'mapbox-gl';
import { PlacesService, MapService } from '../../services';
import { CookieService } from 'ngx-cookie-service';
import { MapsServiceService} from '../../../maps-service.service'

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
    private mapService: MapService,
    private mapaServicee: MapsServiceService,
    private cookieService : CookieService
    ){ }


    

  ngAfterViewInit(): void {
    const geo = [
      {
        "nombre": "balance",
        "longi": -74.775701,
        "lati": 10.957039,
        "img": "../../assets/usuario-pequeno.png"
      },
      {
        "nombre": "balance",
        "longi": -74.775780,
        "lati": 10.957360,
        "img": "../../assets/usuario-pequeno.png"
      }
    ]
    // const cookieToken = this.cookieService.get('loginToken')
    // this.mapaServicee.CargarDoctoresEnMapa({'token':cookieToken}).subscribe(R=>{
    //   if(R){
    //     R.forEach(e => {
    //       geo.push(e)
    //     });
    //   }
    // })
      

      if(!this.placesService.useLocation) throw Error('No hay localizacion');

      mapboxgl.accessToken = 'pk.eyJ1IjoiZWNlcnJvMyIsImEiOiJjbGZxMXh2eXYxN3Z3M3JtaHM2eHVxem1mIn0.7kD1kqlgbK4yUCyR1iEzZw';

    const map = new mapboxgl.Map({
        container: this.mapDivElement.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.placesService.useLocation, //pasamos la localizacion del place.service
        zoom: 16, // starting zoom
    });



  const popup = new Popup()
    .setHTML(`
      <h6>Aqui estoy</h6>
      <img #imgMapaUser src="../../assets/usuario-pequeno.png">
      <span>en este lugar</span>
    `);

    new mapboxgl.Marker({color:'red'})
    // .setLngLat(this.placesService.useLocation)
    .setLngLat(this.placesService.useLocation)
    .setPopup(popup)
    .addTo(map)
    
    this.mapService.setMap(map);

    // Create a default Marker, colored black, rotated 45 degrees.
    // new mapboxgl.Marker({ color: 'blue', rotation: 45 })
    // .setLngLat([-74.775701, 10.957039])
    // .setPopup(popup)
    // .addTo(map);

    

      // Add markers to the map.
    for (const mar of geo) {
      // Create a DOM element for each marker.
      const el = document.createElement('div');
      const width = 40;
      const height = 40;
      el.className = 'marker';
      el.style.backgroundImage = `url(${mar.img})`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100%';
      
      // el.addEventListener('click', () => {
      // window.alert(marker.properties.message);
      // });
      
      const pop = new Popup()
      .setHTML(`
        <h6>Aqui estoy</h6>
        <img #imgMapaUser src="../../assets/usuario-pequeno.png">
        <span>en este lugar</span>
      `);

      let longit = mar.longi;
      let lati = mar.lati;

      // Add markers to the map.
      new mapboxgl.Marker(el)
      
      .setLngLat([longit, lati])
      .setPopup(pop)
      .addTo(map)

      // console.log(marker.geometry.coordinates)
      }

      

 } 
}
