import { Component, AfterViewInit, ViewChild, ElementRef, OnInit,Renderer2, } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Map, Popup, Marker } from 'mapbox-gl';
import { PlacesService, MapService } from '../../services';
import { CookieService } from 'ngx-cookie-service';
import { MapsServiceService} from '../../../maps-service.service'
import { Socket } from 'ngx-socket-io';
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

  
  geoo:any[]= [{
        "nombre": "balance",
        "longi": -74.775701,
        "lati": 10.957039,
        // "img": "../../assets/usuario-pequeno.png"
      },]
  constructor(
    private router : Router,
    private render : Renderer2,
    private socket:Socket,
    private placesService:PlacesService,
    private mapService: MapService,
    private mapaServicee: MapsServiceService,
    private cookieService : CookieService
    ){ 
     
    }
    
    
 
  a(){
    this.mapaServicee.CargarDoctoresEnMapa().subscribe(R=>{
      if (R) {
        // console.log(R.doctores);
        for (let i of R.doctores) {
          
          this.geoo.push({
            "idDoctor":i.idDoctor,
            "nombre": i.nombre,
            "longi": i.longi,
            "lati": i.lati,

          });
        }
      }
    })
    console.log(this.geoo)
  }
  ngOnInit(): void{
    this.a()
    // this.socket.emit('addSala',{'id':'1'})
    // this.sendMessage()
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit() {
    // let geo:any = []
    
    // console.log(geo)
    // let geo:any = [
    //   {
    //     "nombre": "balance",
    //     "longi": -74.775701,
    //     "lati": 10.957039,
    //     // "img": "../../assets/usuario-pequeno.png"
    //   },
    //   {
    //     "nombre": "balance",
    //     "longi": -74.775780,
    //     "lati": 10.957360,
    //     // "img": "../../assets/usuario-pequeno.png"
    //   },
    //   {
    //     "nombre": "balance",
    //     "longi": -74.775789,
    //     "lati": 10.957369,
    //     // "img": "../../assets/usuario-pequeno.png"
    //   }
    // ]
    
    
    
    // const cookieToken = this.cookieService.get('loginToken')
    // this.mapaServicee.CargarDoctoresEnMapa({'token':cookieToken}).subscribe(R=>{
    //   if(R){
    //     R.forEach(e => {
    //       geo.push(e)
    //     });
    //   }
    // })
    // this.cargarDoctoresEnMapa()
    
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
      <h6>YO</h6>
      
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
    if(this.geoo.length == 0){
      console.log(this.geoo)
      console.log('esta vacio')
    }else{
      for (let mar of this.geoo) {
        let ramdow = Math.floor(Math.random()*3+1)
        console.log(ramdow)
        console.log("aqui", mar.lati, mar.longi,mar.nombre)
         // Create a DOM element for each marker.
         const el = document.createElement('div');
         const width = 40;
         const height = 40;
         el.className = 'marker';
         el.style.backgroundImage = `url("../../assets/doc${ramdow}.png")`;
         el.style.width = `${width}px`;
         el.style.height = `${height}px`;
         el.style.backgroundSize = '100%';
         
         // el.addEventListener('click', () => {
         // window.alert(marker.properties.message);
         // });
       
         
         const pop = new Popup()
         .setHTML(`
         
          <h6 class = "POPnombre" >${mar.nombre}</h6>
          <div class = "POPflex">
            <img class="imgMapaUser" src="../../assets/doc${ramdow}.png">
           <button id="popup-btn" "type="button" class="btn btn-primary btnVerPerfil">Ver perfil</button>
          </div>
          <div class = "POPcalificaciones">
          <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
          </div>

         `);
          pop.on('open', () => {
            const button = document.getElementById('popup-btn');
            button?.addEventListener('click', () => {
              // this.socket.emit('SolicitarServicio',{'id':`${mar.idDoctor}`,'token':this.cookieService.get('loginToken')})
              // button.style.display= 'none'
              // setTimeout(()=>{
              //   button.style.display= 'block'
              // },5000)
              this.router.navigate(['/perfilDoc',mar.idDoctor])
            });
          });
       
         //let longit = mar.longi;
         let longit = mar.longi;
         let lati =  mar.lati;
         
   
         // Add markers to the map.
         new mapboxgl.Marker(el)
         
         .setLngLat([longit,lati])
         .setPopup(pop)
         .addTo(map)
   
         // console.log(marker.geometry.coordinates)
       }
       
    }
   
  } 
 
  sendMessage(){
    console.log('click')
  }
  

}
