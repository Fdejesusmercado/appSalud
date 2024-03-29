import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  private apiUrl = 'http://127.0.0.1:3000/login';
  private apiUrlCargarPerfil = 'http://127.0.0.1:3000/cargarPerfil'
  private apiEliminarDiscapacidad = 'http://127.0.0.1:3000/eliminarDiscapacidad'
  private apiAllDiscapacidades = 'http://127.0.0.1:3000/allDiscapacidades'
  private apiAddlDiscapacidades = 'http://127.0.0.1:3000/addDiscapacidad'
  private apiCargarPerfilPorId = 'http://127.0.0.1:3000/cargarPerfilPorId'
  private apiCargarHistorial = 'http://127.0.0.1:3000/cargarHistorial'
  private apiUpdateServicio = 'http://127.0.0.1:3000/updateEstado'
  private apiRegistrarUser = 'http://127.0.0.1:3000/registrarUser'
  constructor(private http: HttpClient) { }


  // Metodos
  login(data: any): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}`,data);
  }

  CargarPerfil(data:any):Observable<any> {
    return this.http.post<any>(`${this.apiUrlCargarPerfil}`,data);
  }
  
  CargarPerfilPorId(data:any):Observable<any> {
    return this.http.post<any>(`${this.apiCargarPerfilPorId}`,data);
  }
  eliminarDiscapacidad(data:any):Observable<any>{
    return this.http.put<any>(`${this.apiEliminarDiscapacidad}`,data);
  }

  allDiscapacidades():Observable<any>{
    return this.http.get<any>(`${this.apiAllDiscapacidades}`)
  }
  addDiscapacidad(date:any):Observable<any>{
    return this.http.post<any>(`${this.apiAddlDiscapacidades}`,date)
  }
  
  cargarHistorial(date:any):Observable<any>{
    return this.http.post<any>(`${this.apiCargarHistorial}`,date)
  }

  updateServicio(date:any):Observable<any>{
    return this.http.put<any>(`${this.apiUpdateServicio}`,date)
  }
  RegistrarUser(date:any):Observable<any>{
    return this.http.post<any>(`${this.apiRegistrarUser}`,date)
  }
}

