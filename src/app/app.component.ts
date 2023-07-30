import { Socket } from 'ngx-socket-io';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private socket:Socket,
    private msg :ToastrService,
  ){

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
    throw new Error('Method not implemented.');
  }
  
  
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
  
}
