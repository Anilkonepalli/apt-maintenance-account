import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Role }														from './model';
import { RoleService }										from './service';

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

  models: Observable<Role[]> = Observable.of([]);
  model: Role = new Role();
  totalRoles: number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log('Initializing Role Component...');
  }

}
