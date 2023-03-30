import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DirectionsApliClient } from '../api/directionsApliClient';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];
  // public isLoading = false;

  get inUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  // constructor(private http: HttpClient) { 
  //   this.getUserLocation(); 
  // }
  constructor(private directionsApi: DirectionsApliClient) { 
    this.getUserLocation(); 
  }

  public async getUserLocation(): Promise<[number, number]> { 
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords}) => {
          this.useLocation = [ coords.longitude, coords.latitude ];
          resolve(this.useLocation);

          //localizacion para mandarla a la api
          console.log(this.useLocation);
        },
        (err) => {
          alert('no se pudo obtener la geolocation');
          reject();
        }
      );
    },);
  }

  getDirectionsByQuery(query: string = ''){
    this.directionsApi.get<DirectionsApliClient>(`/${query}.json`);
  }
}
