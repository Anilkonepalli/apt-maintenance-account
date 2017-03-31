import { Component, Host } from '@angular/core';
import { JwtHelper } 		   from 'angular2-jwt';

import { AppComponent } 	 from './app.component';

@Component({
    selector: 'home',
    template: `
		<h1>Welcome to Apt Maint Acct</h1>
		<h2 *ngIf="jwt">Your JWT is:</h2>
		<pre *ngIf="jwt" class="jwt"><code>{{ jwt }}</code></pre>
		<pre *ngIf="jwt" class="jwt"><code>{{ decodedJwt | json }}</code></pre>
	`
})
export class HomeComponent {
    jwt: string;
    decodedJwt: string;
    JwtHelper = new JwtHelper();

    constructor( @Host() parent: AppComponent) {
        this.jwt = localStorage.getItem('id_token');
        this.decodedJwt = this.jwt && this.JwtHelper.decodeToken(this.jwt);
    }
}
