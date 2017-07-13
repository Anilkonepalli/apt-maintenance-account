import { Injectable }           from '@angular/core';
import { Http, Headers } 	      from '@angular/http';
import { Router } 		          from '@angular/router';
import { Observable } 		      from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { User } 					      from '../users/model';
import { Authorization }        from '../authorization/model';

import { MODULE }               from '../shared/constants';

import { UserService }          from '../users/service';
import { AuthService }          from '../authentication/auth.service';
import { AuthorizationService } from '../authorization/service';
import { Logger }               from '../logger/default-log.service';
import { environment }          from '../../environments/environment';

@Injectable()
export class UserProfileService extends UserService {

  protected modelUrl = environment.API_URL + '/api/userprofile';

  constructor(
    protected http: Http,
    protected logger: Logger,
    protected router: Router,
    protected auth: AuthService,
    protected authzn: AuthorizationService) {
    super(http, logger, authzn);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
