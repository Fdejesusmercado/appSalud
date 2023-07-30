import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';  
import {LoginService} from '../../app/login.service';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-perfil-doc',
  templateUrl: './perfil-doc.component.html',
  styleUrls: ['./perfil-doc.component.css']
})
export class PerfilDocComponent implements OnInit{
  id: any;
  nombrePerfil = ''
  documentosQllegan :any 
  constructor(
    private route: ActivatedRoute,
    private servicio: LoginService,
    private socket:Socket,
    private cookieService : CookieService,

    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.cargarPerfil()
  }

  cargarPerfil(){
    this.servicio.CargarPerfilPorId({'id':this.route.snapshot.paramMap.get('id')}).subscribe(R=>{
      if (R){
        
        this.nombrePerfil = R.fullname
        
        console.log(R) 
        
        this.documentosQllegan = R.documentos
        console.log(this.documentosQllegan)
      }
    })
    
  }

  solicitarServicio(){
    this.socket.emit('SolicitarServicio',{'id':this.id,'token':this.cookieService.get('loginToken')})
  }
}
