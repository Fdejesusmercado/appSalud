import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';
import { DirectionsApliClient } from '../api/directionsApliClient';
import { DirectionsResponse } from '../interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;

  get isMapReady(){
    return !!this.map;
  }

  constructor(private directionsApi: DirectionsApliClient){}

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords:LngLatLike){
    if(!this.isMapReady) throw Error("el mapa no esta inicializado");

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })

  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]){

    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
    .subscribe(resp => console.log(resp));
  }
}
