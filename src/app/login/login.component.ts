import { AppComponent } from './../app.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {LoginService} from '../../app/login.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  
  constructor(private socket:Socket, private msg:ToastrService,private servicio: LoginService,private cookieService: CookieService,private readonly  fb:FormBuilder,
    private router: Router, private AppComponent : AppComponent ) { }
  @ViewChild('logP', { static: true })logP!: ElementRef;
  loginForm !:FormGroup
  response!: string;

  ngOnInit(): void {
    this.AppComponent.das.nativeElement.classList.add('ocultar');
    this.cookieService.delete('loginToken'); //Eliminar token al entrar al apartado de login
    // this.socket.emit('addSala',{'id':'1'})

    // this.socket.on('response', (data:any) => {
    //   console.log('Server response:', data);
    //   this.response = data.data;
    // });

    // this.socket.on('connectTRUE', (data:any) => {
    //   console.log('Server response:', data);
      
    // });

    this.loginForm = this.initForm(); //Configuracion del formulario de login


    
    throw new Error('Method not implemented.'); //En caso de error

    
  }
  

  onSubmit():void{ //Cuando se da click al btn login
    const form_login_user = this.loginForm.value.username // usuario que la persona escribe en el login
    const form_login_password = this.loginForm.value.password// Password que el usuario escribe en el login

    this.login({username:form_login_user, password:form_login_password}) //Se pasa el objeto a la funcion login
    this.loginForm.reset(); //Se recetea el formulario para que quede en blanco
  }

  initForm(): FormGroup{//Configuracion del formulario de login
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    
  }

  
  login(data:any){ //Funcion de login
     this.servicio.login(data).subscribe(r=> //Se hace uso del servicio login de la API
      { 
        if (r) {
          console.log(r)
          if (r.acceso){
            this.AppComponent.das.nativeElement.classList.remove('ocultar');
            console.log(r)
            this.cookieService.set('loginToken', r.token,4,'/'); //Se carga el token que rotarna la API en una Cookie
            this.router.navigate(['/perfil'])//Se lleva al perfil
            this.msg.success('Bienvenid@ al sistema', r.fullname);//Se muestra un msgAlerta
            
          }else{//Contraseña incorrecta se manda un error y se muestra el msg que responde la API
            this.msg.error(`${r.description}`, 'Error', {
              timeOut: 3000,
            }); 
            
          }
          
        }
        
      })

  }
  // sendMessage(){
    // this.socket.emit('message', 'Hello, Server!');
  // }
}
