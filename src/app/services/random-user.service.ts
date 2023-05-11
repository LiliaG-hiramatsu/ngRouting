import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IRandomContact } from '../models/randomuser';
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

  obtenerRandomContacts(n: number): Observable<Results[]> {
    const opciones: HttpParams = new HttpParams().set("results", n);
    return this.http.get<Results[]>('https://randomuser.me/api', {params: opciones}).pipe(
    retry(2), // Numero de reintentos de peticiones
    catchError(this.handleError) // sacamos error si algo falta
    );
  }

  obtenerRandomContactPorGenero(genero: string): Observable<Results[]> {
    const opciones: HttpParams = new HttpParams().set("gender", genero);
    return this.http.get<Results[]>('https://randomuser.me/api', {params: opciones}).pipe(
    retry(2), // Numero de reintentos de peticiones
    catchError(this.handleError) // sacamos error si algo falta
    );
  }

}
