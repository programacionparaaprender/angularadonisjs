import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tio } from 'src/app/commons/models/tio';
import axios from "axios";
import { TioDto } from 'src/app/commons/request/tioDto';



@Injectable({
  providedIn: 'root'
})

export class TioService {
  //tioURL = 'http://localhost:8762/api/tio/';
  tioURL = "http://localhost:3333/api/v1/usuarios/";
  usuariologeado = false;
  constructor(private httpClient: HttpClient) { }


  obtenerUsuarioLogeado(): boolean{
    return this.usuariologeado;
  }
  cambiarLogeo(valor:boolean): void {
    this.usuariologeado = valor;
  }

  lista(): Observable<Tio[]> {
    return this.httpClient.get<Tio[]>(this.tioURL);
  }

  detalle(id: number): Observable<Tio> {
    return this.httpClient.get<Tio>(this.tioURL + `/${id}`);
  }

  async registrar(tio: TioDto){
    try{
      var response;
      response = await axios.post(this.tioURL + 'registro', tio);
      return response;
      
    }catch(e: unknown | any){
      console.log("tio");
      console.log(JSON.stringify(tio));
      console.log("error");
      console.log(e);
      return e.response;
    }
  }

  /* registrar(tio: Tio): Observable<any> {
    return this.httpClient.post<any>(this.tioURL + 'nuevo', tio);
  } 

  nuevo(tio: Tio): Observable<any> {
    return this.httpClient.post<any>(this.tioURL + 'nuevo', tio);
  }
  */
  actualizar(tio: Tio, id: number): Observable<any> {
    return this.httpClient.put<any>(this.tioURL + `/${id}`, tio);
  }

  borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.tioURL + `/${id}`);
  }
}
