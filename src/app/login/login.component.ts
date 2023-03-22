import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../app/login.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  constructor(private servicio: LoginService,private cookieService: CookieService,private readonly  fb:FormBuilder,
    private router: Router
    ) { }
  
  loginForm !:FormGroup


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
          }
          
        }
        
      })

  }
}
