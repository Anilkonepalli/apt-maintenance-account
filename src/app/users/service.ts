import { Injectable } 		      from '@angular/core';
import { Http, Headers } 	      from '@angular/http';
import { Observable } 		      from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { User } 					      from './model';
import { Role } 					      from '../roles/model';
import { Permission } 		      from '../permissions/model';
import { Authorization } 	      from '../authorization/model';

import { MODULE }               from '../shared/constants';

import { AuthorizationService } from '../authorization/service';
import { Logger }               from '../logger/default-log.service';

@Injectable()
export class UserService {

  private modelUrl = process.env.API_URL + '/api/users';
  private id_token = localStorage.getItem('id_token');
  private userId = localStorage.getItem('userId');
  private headers = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': this.id_token
  });

  constructor(
    private http: Http,
    private logger: Logger,
    private authzn: AuthorizationService) { }

  getList(): Promise<User[]> {
    return this.http
      .get(this.modelUrl, { headers: this.headers })
      .toPromise()
      .then(models => models.json() as User[])
      .catch(this.handleError)
  }

  getUserFor(id: number): Promise<User> {
    const url = this.modelUrl + '/' + id;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(model => model.json() as User)
      .catch(this.handleError);
  }

  getRolesFor(id: number): Promise<Role[]> {
    const url = this.modelUrl + '/myroles/' + id;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(models => models.json() as Role[])
      .catch(this.handleError);
  }

  getAuthzn(): Authorization {
    return this.authzn.get(MODULE.USER.name);
  }

  /*
    getAuthorization(): Promise<Authorization> {
      return this.getAuthorizationFor('users');
    }
    getAuthorizationFor(moduleName: string): Promise<Authorization> {
      let url = this.modelUrl + '/mypermissions/' + moduleName;
      this.logger.info('User.getAuthorizationFor( ' + moduleName + ' )...URL is ' + url);
      return this.http
        .get(url, { headers: this.headers })
        .toPromise()
        .then(models => {
          let perms = models.json() as Permission[];
          if (perms.length < 1) alert('No permissions on ' + moduleName);
          this.logger.info('Permissions are:...'); this.logger.info(perms);
          let auth = new Authorization(perms, +this.userId);
          return auth;
        })
        .catch(this.handleError);
    }
  */

  update(model: User): Promise<User> {
    const url = `${this.modelUrl}/${model.id}`;
    return this.http
      .put(url, JSON.stringify(model), { headers: this.headers })
      .toPromise()
      .then(() => model)
      .catch(this.handleError);
  }

  updateRolesFor(modelId: number, attachedIds: number[]): Promise<number> {
    const url = `${this.modelUrl}/myroles/${modelId}`;
    let data = { 'myrolesIds': attachedIds };
    return this.http
      .put(url, JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(() => modelId)
      .catch(this.handleError);
  }

  create(model: User): Promise<User> {
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
