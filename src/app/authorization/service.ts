import { Injectable } 				          from '@angular/core';
import { Observable } 				          from 'rxjs/Observable';
import { Http, Headers, Response }      from '@angular/http';
import { JwtHelper } 				            from 'angular2-jwt';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Permission } 		              from '../permissions/model';
import { Logger }		                    from '../logger/default-log.service';
import { Message, ErrorMessage,
  InfoMessage, WarningMessage }         from '../shared';

import 'rxjs/add/operator/toPromise';

/*
const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
*/

@Injectable()
export class AuthorizationService {
  private modelUrl = process.env.API_URL + '/api/user/allpermissions';
  private id_token = localStorage.getItem('id_token');
  private userId = localStorage.getItem('userId');
  private headers = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': this.id_token
  });
  private canAccess = false;

  constructor(
    private http: Http,
    private logger: Logger) { }

  init() {
    this.testFn();
  }

  testFn() {
    console.log('Authorization >> TestFn()...');
    this.canAccess = true;
  }

  getAllPermissions(): Promise<Permission[]> {
    console.log('get all permissions of user...');

    let url = this.modelUrl;
    console.log('Authorization service getAllPermissions()...URL is ' + url);
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(models => {
        let perms = models.json() as Permission[];
        //if (perms.length < 1) alert('No permissions on ' + moduleName);
        console.log('Permissions are:...'); console.log(perms);
        //let auth = new Authorization(perms, +this.userId);
        //return auth;
        return perms;
      })
      .catch(this.handleError);
  }


  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

}
