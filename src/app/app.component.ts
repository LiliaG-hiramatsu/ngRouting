import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngRouting';
  token: string | null = null;

  constructor(private router: Router) {  }

  ngOnInit(): void {
      this.token = sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}

// Paso de informacion entre componentes:
// 1- A traves de @Inputs y @Outputs
// 2- A traves de inyeccion de constructores de componentes hijos @ViewChild, @ContentChild o @ContentChildren
// 3- A traves de servicios (Promesas y Observables, etc) ---> NGRX (Gestion del estado de la aplicacion)
// 4- A traves de parametros entre rutas
