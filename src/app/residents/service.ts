import { Injectable }	            from '@angular/core';
import { Http, Headers } 	        from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Resident } 							from './model';
import { Permission } 						from '../permissions/model';

import { Authorization } 					from '../authorization/model';
import { User }                   from '../users/model';

import { MODULE }                 from '../shared/constants';

import { UserService } 						from '../users/service';
import { AuthorizationService }   from '../authorization/service';
import { environment }            from '../../environments/environment';

@Injectable()
export class ResidentService {

  private modelUrl = environment.API_URL + '/api/residents';
  private id_token = localStorage.getItem('id_token');
  private headers = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': this.id_token
  });

  constructor(
    private http: Http,
    private userService: UserService,
    private authzn: AuthorizationService) { }

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

  getAuthzn(): Authorization {
    return this.authzn.get(MODULE.RESIDENT.name);
  }

  getUsers(): Promise<User[]> {
    return this.userService.getList();
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
