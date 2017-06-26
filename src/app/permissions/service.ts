import { Injectable }             from '@angular/core';
import { Http, Headers } 	        from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Permission } 		        from './model';
import { Authorization } 	        from '../authorization/model';

import { MODULE }                 from '../shared/constants';

import { AuthorizationService }   from '../authorization/service';
import { Logger }                 from '../logger/default-log.service';
import { environment }            from '../../environments/environment';

@Injectable()
export class PermissionService {

  private modelUrl = environment.API_URL + '/api/permissions';
  private userModelUrl = environment.API_URL + '/api/users';
  private userId = localStorage.getItem('userId');
  private id_token = localStorage.getItem('id_token');
  private headers = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': this.id_token
  });

  constructor(
    private http: Http,
    private authzn: AuthorizationService,
    private logger: Logger) { }

  getList(): Promise<Permission[]> {
    return this.http
      .get(this.modelUrl, { headers: this.headers })
      .toPromise()
      .then(models => models.json() as Permission[])
      .catch(this.handleError)
  }

  get(id: number): Promise<Permission> {
    const url = this.modelUrl + '/' + id;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(model => model.json() as Permission)
      .catch(this.handleError);
  }

  getAuthzn(): Authorization {
    return this.authzn.get(MODULE.PERMISSION.name);
  }

  update(model: Permission): Promise<Permission> {
    const url = `${this.modelUrl}/${model.id}`;
    return this.http
      .put(url, JSON.stringify(model), { headers: this.headers })
      .toPromise()
      .then(() => model)
      .catch(this.handleError);
  }

  create(model: Permission): Promise<Permission> {
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
