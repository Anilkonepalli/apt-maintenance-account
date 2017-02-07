import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');


@Injectable()
export class AuthService {
	
	isLoggedIn: boolean = false;

	// store the URL so we can redirect after logging in
	redirectUrl: string;

	constructor(private http: Http) {}

	login( event: String, email: String, password: String ): Observable<boolean> {
		let data = JSON.stringify({ email, password });
		let url = 'http://localhost:3002/api/sessions/create';

		this.http.post(url, data, {headers: contentHeaders})
			.subscribe(
				response => { 
					localStorage.setItem('id_token', response.json().id_token);
					this.isLoggedIn = true;
				},
				error => { 
					this.isLoggedIn = false;

					// ToDo: Use a remote logging infrastructure later
					let errMsg: string;
					if(error instanceof Response) {
						const body = error.json() || '';
						const err = body.error || JSON.stringify(body);
						errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
					} else {
						errMsg = error.message ? error.message : error.toString();
					}
					console.error(errMsg);
				}
			);
		return Observable.of(this.isLoggedIn).delay(1000);
	}

	logout(): void {
		this.isLoggedIn = false;
	}
}
