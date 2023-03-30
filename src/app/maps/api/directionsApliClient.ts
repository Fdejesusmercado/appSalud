import { HttpClient, HttpHandler} from "@angular/common/http";
import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root'
})
export class DirectionsApliClient extends HttpClient{

    public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';

    constructor( handler:HttpHandler){
        super(handler);
    }

    public override get<T>( url: string){

        url = this.baseUrl + url;

        return super.get<T>( url, {
            params: {
                alternatives: false,
                geometries: 'geojson',
                language: 'es',
                overview: 'simplified',
                steps: false,
                access_token: 'pk.eyJ1IjoiZWNlcnJvMyIsImEiOiJjbGZxMXh2eXYxN3Z3M3JtaHM2eHVxem1mIn0.7kD1kqlgbK4yUCyR1iEzZw'
            }
        } );
    }
}