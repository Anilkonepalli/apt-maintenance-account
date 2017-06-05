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
  private modelUrl = process.env.API_URL + '/api/users/allpermissions';
  private permissions: Permission[];

  // initialize on user logging in
  private id_token: string;
  private userId: string;
  private headers: Headers;


  constructor(
    private http: Http,
    private logger: Logger) { }

  /**
   * init is called after user is logged-in in the Authentication Service
   * @return none
   */
  init() {

    this.id_token = localStorage.getItem('id_token');
    this.userId = localStorage.getItem('userId');

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.id_token
    });

    this.getAllPermissions()
      .then((models: Permission[]) => {
        this.permissions = models;
        console.log('All Permissions of logged in user...'); console.log(this.permissions);
      });
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
