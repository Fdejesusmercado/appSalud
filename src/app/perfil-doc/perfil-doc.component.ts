import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';  
import {LoginService} from '../../app/login.service';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-perfil-doc',
  templateUrl: './perfil-doc.component.html',
  styleUrls: ['./perfil-doc.component.css']
})
export class PerfilDocComponent implements OnInit{
  id: any;
  nombrePerfil = ''
  cargo = ''
  dir = ""
  documentosQllegan :any 
  discapacidadesQllegan:any
  
  @ViewChild('btnSolicitarSV')
  btnSolicitarSV!: ElementRef

  constructor(
    private msg: ToastrService ,
    private routerNavigate : Router,
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
        if(R.cargo == '2'){
          this.cargo = 'Doctor'
        }else{
          this.cargo = 'Paciente'
        }
        this.dir = R.direccion
        this.documentosQllegan = R.documentos
        this.discapacidadesQllegan = R.discapacidades
        console.log(this.documentosQllegan)
      }
    })
    
  }

  solicitarServicio(){
    this.btnSolicitarSV.nativeElement.remove()
    this.routerNavigate.navigate(['/historial'])
    this.msg.info(this.nombrePerfil,'Solicitando servicio al doctor:', {
      timeOut: 3000,
      progressBar:true,
      });
   
    this.socket.emit('SolicitarServicio',{'id':this.id,'token':this.cookieService.get('loginToken')})
  }
}
