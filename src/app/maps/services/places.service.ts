import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];
  // public isLoading = false;

  get inUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor() { 
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
}
