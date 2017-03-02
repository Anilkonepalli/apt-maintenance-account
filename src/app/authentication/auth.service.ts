import { Injectable } 				from '@angular/core';
import { Observable } 				from 'rxjs/Observable';
import { Http, Headers, Response } 	from '@angular/http';
import { JwtHelper } 				from 'angular2-jwt';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { Logger }		from '../logger/default-log.service';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');


@Injectable()
export class AuthService {
	
	isLoggedIn: boolean = false;
	JwtHelper = new JwtHelper();

	// store the URL so we can redirect after logging in
	redirectUrl: string;

	constructor(private http: Http, private logger: Logger) {}

	login( event: String, email: String, password: String ): Observable<boolean> {
		let data = JSON.stringify({ email, password });
		//let url = 'http://localhost:3002/api/sessions/create';
		//let url = 'http://localhost:3002/api/login';
		let url = process.env.API_URL+'/api/login';

		this.http.post(url, data, {headers: contentHeaders})
			.subscribe(
				response => { 
//console.log('Logged In success...response object is...'); console.log(response.json());
					this.logger.info('Logged In successfully...');
					let res = response.json();
					localStorage.setItem('id_token', res.id_token);
					//localStorage.setItem('user', res.user.id);
					let decodedJwt = res.id_token && this.JwtHelper.decodeToken(res.id_token);
					localStorage.setItem('userId', decodedJwt.id);
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
console.log("Auth Service Logout now...");
		this.isLoggedIn = false;
	}
}
