import { Component, OnInit } from '@angular/core';

import { NavigationExtras, Router } from '@angular/router';
import { IContacto } from 'src/app/models/contact.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  token: string | null = null;
  contactoSeleccionado: IContacto | undefined;

  constructor (private router: Router) { }

  ngOnInit(): void {

    // Comprobar si existe el token en el sessionStorage
    this.token = sessionStorage.getItem('token');

    // Leemos del estado del historial de navegacion
    if (history.state.data) {
      console.log(history.state.data);
      this.contactoSeleccionado = history.state.data;
    }
  }

  navegarAContacts(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        genero: 'todes'
        // aca podemos especificar cuelquier filtro que queramos
      }
    }
    this.router.navigate(['contacts'], navigationExtras);
  }
}
