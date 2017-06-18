import { Injectable } 				          from '@angular/core';
import { Observable } 				          from 'rxjs/Observable';
import { Http, Headers, Response }      from '@angular/http';
import { JwtHelper } 				            from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { Permission } 		              from '../permissions/model';
import { Authorization }                from './model';

import { Message, ErrorMessage,
  InfoMessage, WarningMessage }         from '../shared';
import { MODULE }                       from '../shared/constants';

import { Logger }		                    from '../logger/default-log.service';


@Injectable()
export class AuthorizationService {
  private modelUrl = process.env.API_URL + '/api/users/allpermissions';
  private permissions: Permission[];

  // available module keys are collected
  private moduleKeys: string[] = Object.keys(MODULE);

  // available module names/values are collected
  private resources: string[] = this.moduleKeys.map((key: string) => MODULE[key].name); // collect MODULE values

  // holds authorization model for each resources
  private authzns: any = {};

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
        this.initAuthzns_n_allows();
        this.logger.info('Authorizations are...'); this.logger.info(this.allows);
        this.initAllowsAdmin();
      });
  }

  initAuthzns_n_allows() {
    this.resources.forEach((resource: string) => {
      let resourcePermissions = this.permissions
        .filter((eachPerm: Permission) =>
          eachPerm.resource === resource);
      this.logger.info('Permission on Resource: ' + resource); this.logger.info(resourcePermissions);
      let authzn = new Authorization(resourcePermissions, +this.userId);
      this.authzns[resource] = authzn; // sets authorization model
      this.allows[resource] = authzn.allowsAny(+this.userId); // sets boolean value
    });
  }

  initAllowsAdmin() {
    let disallowedList = this.adminResources.filter((each: string) => !this.allows[each]);
    this.logger.info('Disallowed List length: ' + disallowedList.length + '; AdminResources Length: ' + this.adminResources.length);
    this.allowsAdminResources = disallowedList.length < this.adminResources.length;
  }

  getAllPermissions(): Promise<Permission[]> {
    this.logger.info('get all permissions of user...');

    let url = this.modelUrl;
    this.logger.info('Authorization service getAllPermissions()...URL is ' + url);
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(models => {
        this.logger.info('All Permission models...'); this.logger.info(models);
        let perms = models.json() as Permission[];
        if (perms.length < 1) alert('No permissions available for the user ');
        this.logger.info('Permissions are:...'); this.logger.info(perms);
        return perms;
      })
      .catch(this.handleError);
  }

  /**
   * Answers Authorization for the given resource
   * @type {[type]}
   */
  public get(resource: string): Authorization {
    return this.authzns[resource];
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

}
