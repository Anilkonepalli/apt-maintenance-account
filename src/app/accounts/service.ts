import { Injectable } 															from '@angular/core';
import { Http, Headers, Response, RequestOptions } 	from '@angular/http';
import { Observable } 															from 'rxjs/Observable';

import { Account } 																	from './model';
import { Permission } 															from '../permissions/model';
import { UserService } 															from '../users/service';
import { Authorization } 														from '../authorization/model';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AccountService {

    private modelUrl = process.env.API_URL + '/api/maintenance-accounts';
    private id_token = localStorage.getItem('id_token');
    private headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': this.id_token
    });

    constructor(
        private http: Http,
        private userService: UserService
    ) { }

    getList999(): Observable<Account[]> {
        return this.http.get(this.modelUrl)
            .map(this.extractData)
            .catch(this.handleError999);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.data || [];
    }

    private handleError999(error: any) {
        // In a real world app, error is send to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getList(): Promise<Account[]> {
        return this.http
            .get(this.modelUrl, { headers: this.headers })
            .toPromise()
            .then(models => {
                return models.json() as Account[];
            })
            .catch(this.handleError)
    }

    get(id: number): Promise<Account> {
        const url = this.modelUrl + '/' + id;
        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(model => model.json() as Account)
            .catch(this.handleError);
    }

    getAuthorization(): Promise<Authorization> {
        return this.userService.getAuthorizationFor('accounts');
    }

    update(model: Account): Promise<Account> {
        const url = `${this.modelUrl}/${model.id}`;
        return this.http
            .put(url, JSON.stringify(model), { headers: this.headers })
            .toPromise()
            .then(() => model)
            .catch(this.handleError);
    }

    create(model: Account): Promise<Account> {
        return this.http
            .post(this.modelUrl, JSON.stringify(model), { headers: this.headers })
            .toPromise()
            .then(model => model.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.modelUrl}/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Promise.reject(error.message || error);
    }

}
