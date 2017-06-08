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
import { MODULE }                       from '../shared/constants';
import { Authorization }                from './model';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthorizationService {
  private modelUrl = process.env.API_URL + '/api/users/allpermissions';
  private permissions: Permission[];

  // available module keys are collected
  private moduleKeys: string[] = Object.keys(MODULE);

  // available module names/values are collected
  private resources: string[] = this.moduleKeys.map((key: string) => MODULE[key].name); // collect MODULE values

  // holds authorization model for each resources
  private auths: any = {};

  // holds boolean value for each resources indicating whether the module is accessbible or not
  public allows: any = {};

  private adminResources: string[] = this.moduleKeys
    .filter((key: string) => MODULE[key].isAdmin)
    .map((key: string) => MODULE[key].name);

  public allowsAdminResources: boolean = false;

  // initialize on user logging in
  private id_token: string;
  private userId: string;
  private headers: Headers;


  constructor(
    private http: Http,
    private logger: Logger) { }

  /**
   * init is called after user is logged-in and it called in the Authentication Service
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
        this.initAuths_n_allows();
        console.log('Authorizations are...'); console.log(this.allows);
        this.initAllowsAdmin();
      });

  }

  initAuths_n_allows() {
    this.resources.forEach((resource: string) => {
      let resourcePermissions = this.permissions
        .filter((eachPerm: Permission) =>
          eachPerm.resource === resource);
      console.log('Permission on Resource: ' + resource); console.log(resourcePermissions);
      let authzn = new Authorization(resourcePermissions, +this.userId);
      this.auths[resource] = authzn; // sets authorization model
      this.allows[resource] = authzn.allowsAny(+this.userId); // sets boolean value
    });
  }

  initAllowsAdmin() {
    let disallowedList = this.adminResources.filter((each: string) => !this.allows[each]);
    console.log('Disallowed List length: ' + disallowedList.length + '; AdminResources Length: ' + this.adminResources.length);
    this.allowsAdminResources = disallowedList.length < this.adminResources.length;
  }


  getAllPermissions(): Promise<Permission[]> {
    console.log('get all permissions of user...');

    let url = this.modelUrl;
    console.log('Authorization service getAllPermissions()...URL is ' + url);
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(models => {
        console.log('All Permission models...'); console.log(models);
        let perms = models.json() as Permission[];
        if (perms.length < 1) alert('No permissions available for the user ');
        console.log('Permissions are:...'); console.log(perms);
        return perms;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

}
