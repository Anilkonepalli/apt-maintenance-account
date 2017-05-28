import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Role }														from './model';
import { RoleService }										from './service';
import { Authorization }									from '../authorization/model';
import { Logger }		                      from '../logger/default-log.service';

import 'rxjs/add/operator/switchMap';

var role_css = require('./component.css');
var role_css_string = role_css.toString();
var role_html = require('./component.html');
var role_html_string = role_html.toString();


@Component({
  selector: 'role',
  styles: [role_css_string],
  templateUrl: role_html_string
})
export class RoleComponent implements OnInit {

  models: Observable<Role[]>;
  auth: Authorization;
  addAllowed: boolean = false;
  private selectedId: number;
  model: Role = new Role();
  totalRoles: number = 0;

  constructor(
    private service: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger
  ) { }

  ngOnInit(): void {
    console.log('Initializing Role Component...');
    this.models = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getList();
      });

    /*
        this.service.getAuthorization()
          .then(auth => {
            console.log('Inside role component...'); console.log(auth);
            if (auth.permissions.length < 1) return []; // just return empty array if permission list is empty
            this.addAllowed = auth.allowsAdd();
            this.auth = auth;
            this.getList();
          }); */

  }


  onSelect(model: Role): void {
    this.router.navigate(['/roles', model.id]);
  }

  isSelected(model: Role) {
    return model ? model.id === this.selectedId : false;
  }

  add(): void {
    this.router.navigate(['/roles', 0]); // 0 represent new role
  }


  delete(model: Role): void {
    this.service
      .delete(model.id)
      .then(() => { // filter out the deleted Role model from role models
        this.models = this.models.filter((models, i) => {
          return models[i] !== model;
        });
      });
  }

  private getList(): void {
    this.models = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getList();
      });
    this.models.subscribe((models) => {
      this.totalRoles = models.length;
    });
  }

}
