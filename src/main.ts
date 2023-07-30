import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiZWNlcnJvMyIsImEiOiJjbGZxMXh2eXYxN3Z3M3JtaHM2eHVxem1mIn0.7kD1kqlgbK4yUCyR1iEzZw';

if ( !navigator.geolocation){
  alert('El navegador no soporta la geolocation')
}



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
