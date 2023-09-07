import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../maps/services';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  constructor(
    private readonly  fb:FormBuilder,
    private placesService:PlacesService,
    private servicio: LoginService,
    private msg: ToastrService,
    private router: Router
  ){}
  
  RegisterForm !:FormGroup
  ngOnInit(){
    this.RegisterForm = this.initForm(); //Configuracion del formulario de login
  }

  onSubmit(){
    const form_register_user = this.RegisterForm.value.username 
    const form_register_password = this.RegisterForm.value.password
    const form_register_nombre = this.RegisterForm.value.nombre
    const form_register_apellido = this.RegisterForm.value.apellido
    const form_register_departamento = this.RegisterForm.value.departamento
    const form_register_ROL = this.RegisterForm.value.rol 
    const form_register_email = this.RegisterForm.value.email 
    
    let lon = -74.788022
    let lat = 10.986700
    this.servicio.RegistrarUser(
      {'nombre':form_register_nombre,
      'apellido':form_register_apellido,
      'username':form_register_user,
      'password':form_register_password,
      'email':form_register_email,
      'rol':form_register_ROL,
      'departamento':form_register_departamento,
      'lon':lon,
      'lat':lat,  
       
}).subscribe(R=>{
    if(R){
      console.log(R)
      this.msg.success('Registro Exitoso');//Se muestra
      this.router.navigate(['/login'])//Se lleva al perfil 
    }
  })
    
  //  console.log(this.placesService.getUserLocation)
  //   console.log(form_register_password, form_register_user,form_register_nombre,form_register_apellido,form_register_departamento,form_register_ROL)
  }
  initForm(): FormGroup{//Configuracion del formulario de login
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(8)]],
      apellido: ['', [Validators.required, Validators.minLength(8)]],
      departamento: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rol: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.minLength(8)]],
    });
    
  }

  
}
