import { Injectable } 		from '@angular/core';
import { Http, Headers } 	from '@angular/http';

import { Role } 					from './model';
import { Permission } 		from '../permissions/model';
import { Authorization } 	from '../authorization/model';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class RoleService {

  private modelUrl = process.env.API_URL + '/api/roles';
  private userModelUrl = process.env.API_URL + '/api/users';
  private userId = localStorage.getItem('userId');
  private id_token = localStorage.getItem('id_token');
  private headers = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': this.id_token
  });

  constructor(
    private http: Http
  ) { }

  getList(): Promise<Role[]> {
    console.log('roles >> service . getList()...');
    return this.http
      .get(this.modelUrl, { headers: this.headers })
      .toPromise()
      .then(models => models.json() as Role[])
      .catch(this.handleError)
  }

  getMe(id: number): Promise<Role> {
    const url = this.modelUrl + '/' + id;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(model => model.json() as Role)
      .catch(this.handleError);
  }

  getMyPermissions(id: number): Promise<Permission[]> {
    const url = this.modelUrl + '/mypermissions/' + id;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(models => models.json() as Permission[])
      .catch(this.handleError);
  }
  // Note: Get Authorization thorugh User Service approach is giving zone error
  // error occur at DependencyInjection of UserService in the constructor method;
  // so, method, from UserService, needed for authorization is pasted below with few modifications...
  getAuthorization(): Promise<Authorization> {
    console.log('get authorization for roles...');
    let moduleName = 'roles';
    let url = this.userModelUrl + '/mypermissions/' + moduleName;
    console.log('Role service getAuthorization()...URL is ' + url);
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(models => {
        let perms = models.json() as Permission[];
        if (perms.length < 1) alert('No permissions on ' + moduleName);
        console.log('Permissions are:...'); console.log(perms);
        let auth = new Authorization(perms, +this.userId);
        return auth;
      })
      .catch(this.handleError);
  }
  update(model: Role): Promise<Role> {
    const url = `${this.modelUrl}/${model.id}`;
    return this.http
      .put(url, JSON.stringify(model), { headers: this.headers })
      .toPromise()
      .then(() => model)
      .catch(this.handleError);
  }

  updateMyPermissions(modelId: number, attachedIds: number[]): Promise<number> {
    const url = `${this.modelUrl}/mypermissions/${modelId}`;
    let data = { 'mypermissionsIds': attachedIds };
    return this.http
      .put(url, JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(() => modelId)
      .catch(this.handleError);
  }

  create(model: Role): Promise<Role> {
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
