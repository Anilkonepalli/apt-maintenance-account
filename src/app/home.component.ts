import { Component, Host, OnInit } from '@angular/core';
import { JwtHelper } 		   from 'angular2-jwt';

import { AppComponent } 	 from './app.component';
import { Logger }		   from './logger/default-log.service';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'home',
  template: `
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
		    <h1 class="display-5 text-center">Welcome</h1>
        <h1 class="display-6 text-center">to</h1>
        <h1 class="display-5 text-center">Apartment Maintenance Account</h1>
        <hr>
        <h5>It is intended</h5>
        <ul>
          <li>To track the collections and expenses towards maintenance of flats in the apartment complex<br></li>
          <li>To ensure any time access to transactions in the maintenance account<br></li>
          <li>To enable transparency<br></li>
        </ul>
	`
})
export class HomeComponent implements OnInit {
  jwt: string;
  decodedJwt: string;
  JwtHelper = new JwtHelper();

  constructor(
    @Host() parent: AppComponent,
    public authService: AuthService,
    public logger: Logger
  ) { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && this.JwtHelper.decodeToken(this.jwt);
  }
}
