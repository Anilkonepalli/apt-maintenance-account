import { Injectable } 															from '@angular/core';
import { Http, Headers, Response, RequestOptions } 	from '@angular/http';
import { Observable } 															from 'rxjs/Observable';

import { Resident } 															  from './model';
import { Permission } 															from '../permissions/model';
import { UserService } 															from '../users/service';
import { Authorization } 														from '../authorization/model';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ResidentService {

    private modelUrl = process.env.API_URL + '/api/residents';
    private id_token = localStorage.getItem('id_token');
    private headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': this.id_token
    });

    constructor(
        private http: Http,
        private userService: UserService
    ) { }

    getList(): Promise<Resident[]> {
        return this.http
            .get(this.modelUrl, { headers: this.headers })
            .toPromise()
            .then(models => {
                return models.json() as Resident[];
            })
            .catch(this.handleError)
    }

    get(id: number): Promise<Resident> {
        const url = this.modelUrl + '/' + id;
        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(model => model.json() as Resident)
            .catch(this.handleError);
    }

    getAuthorization(): Promise<Authorization> {
        return this.userService.getAuthorizationFor('residents');
    }

    update(model: Resident): Promise<Resident> {
        const url = `${this.modelUrl}/${model.id}`;
        return this.http
            .put(url, JSON.stringify(model), { headers: this.headers })
            .toPromise()
            .then(() => model)
            .catch(this.handleError);
    }

    create(model: Resident): Promise<Resident> {
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
