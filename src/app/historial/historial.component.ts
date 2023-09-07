import {LoginService} from '../../app/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  tuHistorial:any 

  constructor(
    private msg :ToastrService,
    private servicio: LoginService,
    private cookieService: CookieService,
    private router : Router,
  ){

  }
  ngOnInit(): void {
    
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(){

    this.cargarHistorial()
  }
 cargarHistorial(){

   this.servicio.cargarHistorial({'token':this.cookieService.get('loginToken')}).subscribe(R=>{
     if (R){
        console.log(R.fecha)
       this.tuHistorial = R.historial
       console.log(this.tuHistorial)
      }
   })
 }
 verPerfil(date:any){
    this.router.navigate(['/perfilDoc',date])
 }

  UpdateEstado(idservicio:any, estadoActualizar:any){
    this.servicio.updateServicio({'idservicio':idservicio , 'estadoActualizar':estadoActualizar}).subscribe(R=>{
      if (R){
        console.log(R)
        if(estadoActualizar === 4){
          this.msg.success(`Servicio Finalizado`, 'Alerta', {
            timeOut: 2000,
            progressBar:true,
          });
        }else if(estadoActualizar === 3){
          this.msg.error(`Servicio Cancelado`, 'Alerta', {
            timeOut: 2000,
            progressBar:true,
          });
        }else if(estadoActualizar === 2){
          this.msg.success(`Servicio Aceptado`, 'Alerta', {
            timeOut: 2000,
            progressBar:true,
          });
        }


          setTimeout(()=>{
            window.location.reload();
          },2000)
      }
    })
  }
    
  

}


