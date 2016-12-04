import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { User } from './models/user';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styles: [`
		.login {
			width: 40%;
		}`
	]
})
export class LoginComponent {

	constructor( private http: Http, private router: Router ) {}

	login( event: String, email: String, password: String ) {
		let data = JSON.stringify({ email, password });
		let url = 'http://localhost:3002/api/sessions/create';
		this.http.post(url, data, {headers: contentHeaders})
			.subscribe(
				response => {
					localStorage.setItem('id_token', response.json().id_token);
					this.router.navigate(['/home']);
				},
				error => {
					alert( error.text() );
					console.log( error.text() );
				}
			);
	}

	cancel() {
		this.router.navigate(['/home']);
	}

	signup() {
		this.router.navigate(['/signup']);
	}
}