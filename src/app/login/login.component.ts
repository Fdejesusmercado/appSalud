import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {LoginService} from '../../app/login.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  constructor(private msg:ToastrService,private servicio: LoginService,private cookieService: CookieService,private readonly  fb:FormBuilder,
    private router: Router
     
    ) { }
  
  loginForm !:FormGroup
  
  @ViewChild('loginCabecera') LoginCabecera!: ElementRef;

  ngOnInit(): void {
    this.cookieService.delete('loginToken');
    this.loginForm = this.initForm();
    throw new Error('Method not implemented.');
  }
  

  onSubmit():void{
    this.login({username:this.loginForm.value.username, password:this.loginForm.value.password})
    this.loginForm.reset();
  }

  initForm(): FormGroup{
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    
  }

  
  login(data:any){
     this.servicio.login(data).subscribe(r=>
      { 
        if (r) {
          console.log(r)
          if (r.acceso){
            console.log(r)
            this.cookieService.set('loginToken', r.token,4,'/');
            this.router.navigate(['/perfil'])
            this.msg.success('Bienvenid@ al sistema', r.fullname);
            
          }else{
            this.msg.error(`${r.description}`, 'Error', {
              timeOut: 3000,
            });
            // this.msg.show(`${r.description}`, 'Error!');
            // console.log(this.LoginCabecera.nativeElement)
            // const nuevoElemento = document.createElement('h5');
            // nuevoElemento.textContent = r.description
            // nuevoElemento.style.cssText = `
            // padding: .2rem;
            // border-radius: .3rem;
            // margin-top: .6rem;
            // font-weight: bold;
            // background-color: rgba(128, 0, 128, 0.487);
            // `
            // this.LoginCabecera.nativeElement.appendChild(nuevoElemento)
            // setTimeout(() => {
            //   console.log(nuevoElemento)
            //   nuevoElemento.remove()
            // }, 3000);
          }
          
        }
        
      })

  }
}
