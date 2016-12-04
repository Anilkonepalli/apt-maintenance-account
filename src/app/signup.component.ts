import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { User } from './models/user';


const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styles: [
		`.ng-valid[required] {
			border-left: 5px solid #42A948; /* green */
		}
		
		.ng-invalid {
			border-left: 5px solid #a94442; /* red */
		}`
	]
})
export class SignupComponent {

	constructor(private http: Http, private router: Router) {}

	active = true;

	user = new User(null, 'MohAnna', 'Moh', 'Anna', 'moh@test.com', 'secret');

	saveNewUser() {
		console.log('Submitting Signup form...');

		let data = JSON.stringify(this.user);
		console.log(data);
		let url = 'http://localhost:3002/api/users';
		this.http.post(url, data, {headers: contentHeaders})
			.subscribe(
				response => {
					alert('New User is saved!');
				},
				error => {
					alert('Error in saving new user:' + error.json());
				}
			);
		this.user = new User(10, '', '', '', '', '');
		this.active = false;
		setTimeout( () => this.active = true, 0); // after a small interval set active to true
	}

	cancel() {
		this.router.navigate(['/home']);
	}
}