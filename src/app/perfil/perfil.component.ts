import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../../app/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombrePerfil = ''
  ngOnInit(): void {
    this.cargarPerfil()
    
    throw new Error('Method not implemented.');
  }

  constructor(private servicio: LoginService,private cookieService: CookieService){

  }

  cargarPerfil(){
    this.servicio.CargarPerfil({'token':this.cookieService.get('loginToken')}).subscribe(R=>{
      if (R){
        
        this.nombrePerfil = R.fullname
        console.log(R) 
      }
    })
    
  }
}
