import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContacto } from 'src/app/models/contact.interface';

@Component({
  selector: 'app-contact-detail-page',
  templateUrl: './contact-detail-page.component.html',
  styleUrls: ['./contact-detail-page.component.scss']
})
export class ContactDetailPageComponent implements OnInit {

  id: any | undefined;
  contacto: IContacto = {
    id: 0,
    nombre: '',
    apellidos: '',
    email: '',
    genero: 'Femenino'
  };
  filtroPrevio: string = 'todes';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
      // Vamos a leer los parametros
      this.route.params.subscribe(
        (params: any) => {
          if (params.id) {
            this.id = params.id;
          }
        }
      );

      //this.route.parent?.params -> eso si quisisemos acceder a una ruta padre

      // vamos a leer tambien del state el contacto
      if (history.state.data) {
        this.contacto = history.state.data;
      }

      if (history.state.filtro) {
        this.filtroPrevio = history.state.filtro;
      }
  }
}
