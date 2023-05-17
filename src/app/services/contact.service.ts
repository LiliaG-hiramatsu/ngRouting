import { Injectable } from '@angular/core';
import { IContacto } from '../models/contact.interface';
import { LISTA_CONTACTOS } from '../mock/contacts.mock';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  listaContactos: IContacto[] = LISTA_CONTACTOS;

  constructor() { }

  obtenerContactos(genero?:string): Promise<IContacto[]> {
    if (genero == 'male' || genero == 'female') {
      let listaFiltrada: IContacto[] = this.listaContactos.filter((contacto) => contacto.genero == genero);
      return Promise.resolve(listaFiltrada);
    } else if (genero == 'todos') {
      return Promise.resolve(this.listaContactos);
    }
    else {
      return Promise.reject('Filtro no valido');
    }
  }
}
