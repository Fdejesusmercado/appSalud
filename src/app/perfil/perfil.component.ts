import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../../app/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { vec3 } from 'mapbox-gl';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombrePerfil = ''
  mostrarInfoDiscapacidadd ='Seleccione una discapacidad para ver su informacion'
  documentosQllegan :any 
  discapacidadesQllegan:any
  DiscapacidadesAeliminar:any = []
  AllDiscapacidadesQueLLegan :any = []
  @ViewChild('selectDiscapacidad ', { static: true }) selectDiscapacidad!: ElementRef;

  ngOnInit(): void {
    this.cargarPerfil()
    this.cargarAllDiscapacidades()
    throw new Error('Method not implemented.');
  }
  

  constructor(private msg:ToastrService,router : Router,private loca:Location,private servicio: LoginService,private cookieService: CookieService){

  }

  cargarPerfil(){
    this.servicio.CargarPerfil({'token':this.cookieService.get('loginToken')}).subscribe(R=>{
      if (R){
        
        this.nombrePerfil = R.fullname
        
        console.log(R) 
        
        this.documentosQllegan = R.documentos
        this.discapacidadesQllegan = R.discapacidades
        console.log(this.documentosQllegan) 
      }
    })
    
  }

  remover(idElemento:any){
    
    const elemento =  document.getElementById(`${idElemento}`)
    elemento?.remove()
    console.log(elemento)
    this.DiscapacidadesAeliminar.push(idElemento)
    console.log(this.DiscapacidadesAeliminar)
  }
  

  eliminarDiscapacidad(){
    this.servicio.eliminarDiscapacidad({'token':this.cookieService.get('loginToken'),'dis_eliminar':this.DiscapacidadesAeliminar}).subscribe(R=>{
      if (R){
        console.log(R)
        this.addDiscapacidad()
        this.msg.error(`Aplicando los cambios`, 'Alerta', {
          timeOut: 2000,
          progressBar:true,
          });
        setTimeout(()=>{
          window.location.reload();
        },2000)
      }
    })
  }

  cargarAllDiscapacidades(){
    this.servicio.allDiscapacidades().subscribe(R=>{
      if (R){
        
        this.AllDiscapacidadesQueLLegan = R.allDiscapacidades
        console.log(this.AllDiscapacidadesQueLLegan)
      }
    })
  }
  mostrarInfoDiscapacidad(id:any){
    if (this.AllDiscapacidadesQueLLegan != null){
        for (const i of this.AllDiscapacidadesQueLLegan) {
          if(i.idDiscapacidad == id){
            this.mostrarInfoDiscapacidadd = i.descripcionDis
          }
        }
    }
  }

  addDiscapacidad(){
    this.servicio.addDiscapacidad({'token':this.cookieService.get('loginToken'),'dis_add':this.selectDiscapacidad.nativeElement.value}).subscribe(R=>{
      if (R){
        console.log(R)
      }
    })
    console.log(this.selectDiscapacidad.nativeElement.value)
  }
}
