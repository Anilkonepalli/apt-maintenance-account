import { Injectable, Injector }		from '@angular/core';
import { Http, Headers } 	        from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Flat } 									from './model';
import { Resident } 							from '../residents/model';
import { Authorization } 					from '../authorization/model';

import { APP_CONFIG_TOKEN }       from '../config/app.config';
import { MODULE }                 from '../shared/constants';

import { AuthorizationService }   from '../authorization/service';

@Injectable()
export class FlatService {
  private modelUrl: string;
  // private modelUrl = process.env.API_URL + '/api/flats';
  private id_token = localStorage.getItem('id_token');
  private headers = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': this.id_token
  });
  private config: any;

  constructor(
    private http: Http,
    private authzn: AuthorizationService,
    private injector: Injector) {
    this.config = this.injector.get(APP_CONFIG_TOKEN);
    this.modelUrl = this.config.API_URL + '/api/flats';
  }

  getList(): Promise<Flat[]> {
    return this.http
      .get(this.modelUrl, { headers: this.headers })
      .toPromise()
      .then(models => {
        return models.json() as Flat[];
      })
      .catch(this.handleError)
  }

  get(id: number): Promise<Flat> {
    const url = this.modelUrl + '/' + id;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(model => model.json() as Flat)
      .catch(this.handleError);
  }

  getAuthzn(): Authorization {
    return this.authzn.get(MODULE.FLAT.name);
  }

  getMyResidents(id: number): Promise<Resident[]> {
    const url = this.modelUrl + '/myresidents/' + id;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(models => models.json() as Resident[])
      .catch(this.handleError);
  }

  update(model: Flat): Promise<Flat> {
    const url = `${this.modelUrl}/${model.id}`;
    return this.http
      .put(url, JSON.stringify(model), { headers: this.headers })
      .toPromise()
      .then(() => model)
      .catch(this.handleError);
  }

  updateMyResidents(modelId: number, attachedIds: number[]): Promise<number> {
    const url = `${this.modelUrl}/myresidents/${modelId}`;
    let data = { 'myresidentsIds': attachedIds };
    return this.http
      .put(url, JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(() => modelId)
      .catch(this.handleError);
  }

  create(model: Flat): Promise<Flat> {
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
