import { Injectable }           from '@angular/core';
import { Http, Headers } 	      from '@angular/http';
import { Router } 		          from '@angular/router';
import { Observable } 		      from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { User } 					      from '../users/model';
import { Authorization }        from '../authorization/model';

import { MODULE }               from '../shared/constants';

import { AuthService }          from '../authentication/auth.service';
import { AuthorizationService } from '../authorization/service';
import { environment }          from '../../environments/environment';

@Injectable()
export class UserProfileService {

  private modelUrl = environment.API_URL + '/api/userprofile';
  private id_token = localStorage.getItem('id_token');
  private userId = localStorage.getItem('userId');
  private headers = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': this.id_token
  });

  constructor(
    private http: Http,
    private router: Router,
    private auth: AuthService,
    private authzn: AuthorizationService) { }

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

  getAuthzn() {
    return this.authzn.get(MODULE.USER_PROFILE.name);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

}
