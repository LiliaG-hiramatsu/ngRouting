import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Results } from '../models/randomuser';

@Injectable({
  providedIn: 'root'
})

export class RandomUserService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(`Ha ocurrido un error ${error.error}`);
    } else {
      console.error(`Error en el backend ${error.status}. El error es ${error.error}`);
    }
    return throwError(() => new Error('Error en la peticion de contacto aleatorio.')
    );
  }

  obtenerRandomContact(): Observable<Results> {
    return this.http.get<Results>('https://randomuser.me/api').pipe(
    retry(2), // Numero de reintentos de peticiones
    catchError(this.handleError) // sacamos error si algo falta
    );
  }

  obtenerRandomContacts(n: number, genero?: string): Observable<Results> {
    let params: HttpParams = new HttpParams().set("results", n);

    if (genero) {
      console.log("Filtrado por genero");
      params = params.append('gender', genero); // Actualizar parametros
    }

    return this.http.get<Results>('https://randomuser.me/api', {params: params}).pipe(
      retry(2), // Numero de reintentos de peticiones
      catchError(this.handleError) // sacamos error si algo falta
    );
  }
}
