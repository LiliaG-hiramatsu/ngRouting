import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IContacto } from 'src/app/models/contact.interface';
import { IRandomContact } from 'src/app/models/randomuser';
import { ContactService } from 'src/app/services/contact.service';
import { RandomUserService } from 'src/app/services/random-user.service';
import { Results } from 'src/app/models/randomuser';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {

  cargando: boolean = true;
  filtroGenero: string = 'todos';
  listaRandomContacts: IRandomContact[] = [];

  constructor (private router: Router, private route: ActivatedRoute, private randomUserService: RandomUserService) { }

  ngOnInit(): void {
    // Obtenemos los query params (con ActivatedRoute)
    this.route.queryParams.subscribe((params: any) => {
      console.log("QueryParams: ", params.genero);
      if (params.genero) {
        this.filtroGenero = params.genero

        if (params.genero === 'female' || params.genero === 'male') {
          
          // Implementacion para obtener la lista de contactos aleatorios
          this.randomUserService.obtenerRandomContacts(10, params.genero).subscribe(
            {
              next: (response: Results) => {
                response.results.forEach((randomContact: IRandomContact, index: number) => {
                  this.listaRandomContacts.push(randomContact);
                })
                console.log(this.listaRandomContacts);
              },
              error: (error) => console.error(`${error}`),
              complete: () => {
                console.info('Peticion de random contact terminada.');
                this.cargando = false;
              }
            }
          );
        } else {
          // Implementacion para obtener la lista de contactos aleatorios
          this.randomUserService.obtenerRandomContacts(10).subscribe(
            {
              next: (response: Results) => {
                response.results.forEach((randomContact: IRandomContact, index: number) => {
                  this.listaRandomContacts.push(randomContact);
                })
                console.log(this.listaRandomContacts);
              },
              error: (error) => console.error(`${error}`),
              complete: () => {
                console.info('Peticion de random contact terminada.');
                this.cargando = false;
              }
            }
          );
        }

      }
    });
  }

  // Ejemplo de paso de informacion entre componentes a traves del ESTADO
  volverAHome(contacto: IRandomContact) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: contacto
      }
    }
    this.router.navigate(['/dashboard'], navigationExtras);
  }
}
