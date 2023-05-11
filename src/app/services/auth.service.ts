import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Login del usuario en Reqres
  login (email: string, password: string): Observable<any> {
    let body = {
      email: email,
      password: password
    }

    return this.http.post('https://reqres.in/api/login', body);
  }
  /*
  https://reqres.in/
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
  */

}
