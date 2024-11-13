import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllRentPlazas(page: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/api/get-all-rent-plazas`, { params });
  }

  registerRent(data: {cedulaAbonado: string,numberPlaza: string,montoSemanaMes: string,duracion: string,tipo: string,fechaInicio: string,montoTotal: string, detalle: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/rent-plaza`, data);
  }


}

