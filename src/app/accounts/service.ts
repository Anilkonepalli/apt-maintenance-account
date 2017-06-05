import { Injectable } 						from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams }  from '@angular/http';
import { Observable } 						from 'rxjs/Observable';

import { Account } 								from './model';
import { Permission } 						from '../permissions/model';
import { UserService } 						from '../users/service';
import { Authorization } 					from '../authorization/model';
import { FlatService }            from '../flats/service';
import { Flat }                   from '../flats/model';
import { ResidentService }        from '../residents/service';
import { Resident }               from '../residents/model';

import { MODULE }                 from '../shared/constants';

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
    private userService: UserService,
    private flatService: FlatService,
    private residentService: ResidentService
  ) { }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || [];
  }

  getListFor(fromDate: Date, toDate: Date): Promise<Account[]> {
    let params = new URLSearchParams();
    params.set('fromDate', fromDate.toString());
    params.set('toDate', toDate.toString());
    return this.http
      .get(this.modelUrl, { headers: this.headers, search: params })
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
    //return this.userService.getAuthorizationFor('accounts');
    return this.userService.getAuthorizationFor(MODULE.ACCOUNT.name);
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

  getFlatList(): Promise<Flat[]> {
    return this.flatService.getList();
  }

  getFlatResidents(flatId: number): Promise<Resident[]> {
    return this.flatService.getMyResidents(flatId);
  }

  getResidentList(): Promise<Resident[]> {
    return this.residentService.getList();
  }

  getPeriodicList(month: number, year: number): Promise<Account[]> {
    let params = new URLSearchParams();
    params.set('month', month.toString());
    params.set('year', year.toString());
    let url = process.env.API_URL + '/api/maintenance-accounts-periodic';
    return this.http
      .get(url, { headers: this.headers, search: params })
      .toPromise()
      .then(models => {
        console.log('periodic list models....'); console.log(models);
        return models.json() as Account[];
      })
      .catch(this.handleError)
  }
}
