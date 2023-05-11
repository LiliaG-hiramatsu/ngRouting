import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/models/randomuser';
import { RandomUserService } from 'src/app/services/random-user.service';
import { IRandomContact } from 'src/app/models/randomuser';

@Component({
  selector: 'app-random-contact-page',
  templateUrl: './random-contact-page.component.html',
  styleUrls: ['./random-contact-page.component.scss']
})
export class RandomContactPageComponent implements OnInit {

  contact: IRandomContact | undefined;

  constructor(private randoUserService: RandomUserService) { }

  ngOnInit(): void {
    this.randoUserService.obtenerRandomContact().subscribe((response: Results) => {
      this.contact =  response.results[0];
      // Se lo pasaremos al RandomContact
    });
  }

  obtenerNuevoContacto() {
    this.randoUserService.obtenerRandomContact().subscribe(
      {
        next: (response: Results) => {
          this.contact = response.results[0];
        },
        error: (error) => console.error(`${error}`),
        complete: () => console.info('Peticion de random contact terminada.')
      }
    )
  }

  obtenerListaContactos(n: number) {
    this.randoUserService.obtenerRandomContacts(n).subscribe(
      {
        next: (response: Results[]) => {
          console.log(response);
        },
        error: (error) => console.error(`${error}`),
        complete: () => console.info('Peticion de random contact terminada.')
      }
    )
  }
}
