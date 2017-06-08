import { Injectable } 		from '@angular/core';
import { Http, Headers } 	from '@angular/http';
import { Observable } 		from 'rxjs/Observable';

import { User } 					from '../users/model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserProfileService {

  private modelUrl = process.env.API_URL + '/api/userprofile';
  private id_token = localStorage.getItem('id_token');
  private userId = localStorage.getItem('userId');
  private headers = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': this.id_token
  });

  constructor(private http: Http) { }

  getUserFor(id: number): Promise<User> {
    const url = this.modelUrl + '/' + id;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(model => model.json() as User)
      .catch(this.handleError);
  }

  update(model: User): Promise<User> {
    const url = `${this.modelUrl}/${model.id}`;
    return this.http
      .put(url, JSON.stringify(model), { headers: this.headers })
      .toPromise()
      .then(() => model)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

}
