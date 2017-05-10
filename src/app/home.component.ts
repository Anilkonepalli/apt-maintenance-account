import { Component, Host, OnInit } from '@angular/core';
import { JwtHelper } 		   from 'angular2-jwt';

import { AppComponent } 	 from './app.component';
import { Logger }		   from './logger/default-log.service';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'home',
  template: `
		<h1>Welcome to Apt Maint Acct</h1>
    <h2 *ngIf="authService.isLoggedIn">Your JWT is:</h2>
		<pre *ngIf="authService.isLoggedIn" class="jwt"><code>{{ jwt }}</code></pre>
		<pre *ngIf="authService.isLoggedIn" class="jwt"><code>{{ decodedJwt | json }}</code></pre>

    Dropdown menu 1
    <div ngbDropdown class="d-inline-block">
    	<button class="btn btn-outline-primary" id="dropdownBasic1" ngbDropdownToggle>Toggle dropdown</button>
    	<div class="dropdown-menu" aria-labelledby="dropdownBasic1">
    		<button class="dropdown-item">Action-1</button>
    		<button class="dropdown-item">Another Action</button>
    		<button class="dropdown-item">Something else</button>
    	</div>
    </div>

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
