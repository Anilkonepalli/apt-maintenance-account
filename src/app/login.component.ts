import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { Http, Headers } from '@angular/http';
import { Router, NavigationExtras } from '@angular/router';

//import { User } from './models/user';

import { AuthService } from './auth.service';

/*
const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json'); */

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

	message: string;

	//constructor( private http: Http, private router: Router ) {}
	constructor( public authService: AuthService, public router: Router ) {
		this.setMessage();
	}

	setMessage() {
		this.message = 'Logged '+ (this.authService.isLoggedIn ? 'in' : 'out');
	}
/*	login( event: String, email: String, password: String ) {
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
	}  */

	login( event: String, email: String, password: String ) {
		this.message = 'Trying to log in ...';

		this.authService.login(event, email, password).subscribe( () => {
			this.setMessage();
			if(this.authService.isLoggedIn) {
				console.log('isLoggedIn >> true');
				// Get the redirect URL from our auth service
				// If no redirect is set, use the default
				let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';

				// Set our navigation extras object
				// that passes on our global query params and fragment
				let navigationExtras: NavigationExtras = {
					preserveQueryParams: true,
					preserveFragment: true
				};
console.log('Redirect to ...'+redirect);
				// Redirect the user
				this.router.navigate([redirect], navigationExtras);
			} else {
				console.log('isLoggedIn >> false');
			}
		});
	}

	cancel() {
		this.router.navigate(['/home']);
	}

	signup() {
		this.router.navigate(['/signup']);
	}
}