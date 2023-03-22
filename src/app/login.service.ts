import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  private apiUrl = 'http://127.0.0.1:3000/login';
  private apiUrlCargarPerfil = 'http://127.0.0.1:3000/cargarPerfil'

  constructor(private http: HttpClient) { }


  // Metodos
  login(data: any): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}`,data);
  }

  CargarPerfil(data:any):Observable<any> {
    return this.http.post<any>(`${this.apiUrlCargarPerfil}`,data);
  }
}

