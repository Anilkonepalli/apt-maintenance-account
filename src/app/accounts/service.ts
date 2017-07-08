import { Injectable }		         from '@angular/core';
import {
  Http,
  Headers,
  Response,
  RequestOptions,
  URLSearchParams }               from '@angular/http';
import { Observable } 						from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Account } 								from './model';
import { Permission } 						from '../permissions/model';
import { Authorization } 					from '../authorization/model';
import { Flat }                   from '../flats/model';
import { Resident }               from '../residents/model';

import { MODULE }                 from '../shared/constants';

import { FlatService }            from '../flats/service';
import { ResidentService }        from '../residents/service';
import { AuthorizationService }   from '../authorization/service';
import { Logger }		              from '../logger/default-log.service';

import { environment }            from '../../environments/environment';

@Injectable()
export class AccountService {

  private modelUrl = environment.API_URL + '/api/maintenance-accounts';
  private id_token = localStorage.getItem('id_token');
  private headers = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': this.id_token
  });

  constructor(
    private http: Http,
    private flatService: FlatService,
    private residentService: ResidentService,
    private authzn: AuthorizationService,
    private logger: Logger
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

  getSummaryList(): Observable<any> {
    let url = this.modelUrl + '/summary/list';
    return this.http.get(url, { headers: this.headers });
  }

  get(id: number): Promise<Account> {
    const url = this.modelUrl + '/' + id;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(model => model.json() as Account)
      .catch(this.handleError);
  }

  getAuthzn(res: string = ''): Authorization {
    let resource = res ? res : 'ACCOUNT';
    return this.authzn.get(MODULE[resource].name);
    //return this.authzn.get(MODULE.ACCOUNT.name);
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
    let url = environment.API_URL + '/api/maintenance-accounts-periodic';
    return this.http
      .get(url, { headers: this.headers, search: params })
      .toPromise()
      .then(models => {
        this.logger.info('periodic list models....'); this.logger.info(models);
        return models.json() as Account[];
      })
      .catch(this.handleError)
  }
}
