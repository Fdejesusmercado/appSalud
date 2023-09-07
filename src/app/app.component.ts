import { Socket } from 'ngx-socket-io';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent} from '../app/login/login.component'; // Reemplaza con la ruta correcta
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private socket:Socket,
    private msg :ToastrService,
    private router: Router
    //private componenteLogin : LoginComponent
  ){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Aquí puedes ejecutar tu código personalizado cada vez que cambies de enlace
        // this.das.nativeElement.classList.add('aparecer');
        // Coloca aquí tu código personalizado
      }
    });
  }
  title = 'AppSalud';
  @ViewChild('das', { static: true })das!: ElementRef;
  @ViewChild('pagina', { static: true })pagina!: ElementRef;

  ngOnInit(): void {
    
    this.socket.on('AlguienEstaEnTuSala', (data:any) => {
      console.log('se unieron')
      this.msg.success(data.data,'Serivicio solicitado por:' , {
        timeOut: 3000,
        progressBar:true,
        });
     });
    this.change()
    //this.ocultarmenu()
    throw new Error('Method not implemented.');
  }
  
  // ngAfterViewChecked(){
  //   
  // }
  
  change(){
    const das =  this.das.nativeElement;
    const pagina = this.pagina.nativeElement;
    das.addEventListener("mouseover", ()=>{

      if (window.matchMedia("(max-width: 500px)").matches) {
          das.classList.toggle('width-full')
          pagina.classList.toggle('ocultar')
      } else {
        das.classList.toggle('width-200')
        pagina.classList.toggle('pading-izquierda');
      }
      
  
    });
    das.addEventListener("mouseout", ()=>{

      if (window.matchMedia("(max-width: 500px)").matches) {
        das.classList.toggle('width-full')
        pagina.classList.toggle('ocultar')
    } else {
      das.classList.toggle('width-200')
      pagina.classList.toggle('pading-izquierda');
    }
  
    });
  }
  
  ocultarmenu(){
    // const loginP = this.componenteLogin.logP.nativeElement;
    // const divElement = this.das.nativeElement;
    // if (!loginP) {
    //   console.log('estas en login')
    //   divElement.hidden = true
    // }else{

    // }
  }
}
