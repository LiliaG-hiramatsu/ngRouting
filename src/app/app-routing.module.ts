import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { ContactDetailPageComponent } from './pages/contact-detail-page/contact-detail-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RandomContactPageComponent } from './pages/random-contact-page/random-contact-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: 'hijo',
        component: HomePageComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    component: ContactsPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'contacts/:id', // es una manera de pasar parametros a una ruta concreta
    component: ContactDetailPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'random',
    component: RandomContactPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', // si no encontro el componente adecuado, que cargue
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
