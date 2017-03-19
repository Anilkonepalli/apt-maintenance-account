import { Injectable } 				          from '@angular/core';
import { Observable } 				          from 'rxjs/Observable';
import { Http, Headers, Response }      from '@angular/http';
import { JwtHelper } 				            from 'angular2-jwt';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { Logger }		                    from '../logger/default-log.service';
import { Message, ErrorMessage,
    InfoMessage, WarningMessage }  from '../shared';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');


@Injectable()
export class AuthService {

    isLoggedIn: boolean = false;
    isSocialLoggedIn: boolean = false;
    JwtHelper = new JwtHelper();
    message: Message;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private http: Http, private logger: Logger) { }

    login(event: String, email: String, password: String): Observable<object> {
        let data = JSON.stringify({ email, password });
        let url = process.env.API_URL + '/api/login';

        this.http.post(url, data, { headers: contentHeaders }).subscribe(
            response => {
                this.logger.info('Logged In successfully...');
                let res = response.json();
                localStorage.setItem('id_token', res.id_token);
                let decodedJwt = res.id_token && this.JwtHelper.decodeToken(res.id_token);
                localStorage.setItem('userId', decodedJwt.id);
                this.isLoggedIn = true;
                this.message = new InfoMessage("Success", "log...");
            },
            error => {
                this.isLoggedIn = false;

                // ToDo: Use a remote logging infrastructure later
                let errMsg: string;
                if (error instanceof Response) {
                    errMsg = `${error.status} - ${error.statusText || ''}`;
                } else {
                    errMsg = error.message ? error.message : error.toString();
                }
                this.message = new ErrorMessage("Failure", errMsg);
            });
        return Observable.of(this).delay(1000);
    }

    logout(): void {
        this.logger.info('Logged Out @auth.service...');
        this.isLoggedIn = false;
    }

    socialLogin(network: String, socialToken: String): Observable<object> {
        let data = JSON.stringify({ network: network, socialToken: socialToken });
        let url = process.env.API_URL + '/api/socialLogin';

        this.http.post(url, data, { headers: contentHeaders }).subscribe(
            response => {
                this.logger.info('Logged In successfully...');
                let res = response.json();
                localStorage.setItem('id_token', res.id_token);
                let decodedJwt = res.id_token && this.JwtHelper.decodeToken(res.id_token);
                localStorage.setItem('userId', decodedJwt.id);
                this.isSocialLoggedIn = true;
                this.message = new InfoMessage("Success", "log...");
            },
            error => {
                this.isSocialLoggedIn = false;

                // ToDo: Use a remote logging infrastructure later
                let errMsg: string;
                if (error instanceof Response) {
                    errMsg = `${error.status} - ${error.statusText || ''}`;
                } else {
                    errMsg = error.message ? error.message : error.toString();
                }
                this.message = new ErrorMessage("Failure", errMsg);
            });
        return Observable.of(this).delay(1000);
    }

    socialLogout(): void {
        this.logger.info('Logged Out @auth.service...');
        this.isSocialLoggedIn = false;
    }
}
