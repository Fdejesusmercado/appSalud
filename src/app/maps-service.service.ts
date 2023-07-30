import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsServiceService {

  private apiUrlCargarDoctoresEnMapa = 'http://127.0.0.1:3000/cargarDoctoresEnMapa'; ///
  constructor(private http: HttpClient) { }

   CargarDoctoresEnMapa(): Observable<any>{
    return this.http.get<any>(`${this.apiUrlCargarDoctoresEnMapa}`);
   
  }
}
