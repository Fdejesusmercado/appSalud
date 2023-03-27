import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ){}
  goToMyLocation(){

    if (!this.placesService.inUserLocationReady) throw  Error('No hay ubicacion del usuario');
    if (!this.mapService.isMapReady) throw  Error('No se ha inicializado el mapa');

    this.mapService.flyTo(this.placesService.useLocation!);
  }
}
