import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Month }                          from '../shared';

import { Account }												from './model';
import { AccountService }									from './service';
import { Authorization }									from '../authorization/model';

import 'rxjs/add/operator/switchMap';

var periodic_list_css = require('./periodic-list.component.css');
var periodic_list_css_string = periodic_list_css.toString();
var periodic_list_html = require('./periodic-list.component.html');
var periodic_list_html_string = periodic_list_html.toString();


@Component({
  selector: 'account-periodic-list',
  styles: [periodic_list_css_string],
  templateUrl: periodic_list_html_string
})
export class PeriodicListComponent implements OnInit {
  months: Month[];
  for_month: number;
  for_year: number;

  models: Observable<Account[]>;
  auth: Authorization;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.months = Month.all();
    let today: any = new Date();
    this.for_month = today.getMonth() + 1;
    this.for_year = today.getFullYear();

    this.service.getAuthorization()
      .then(auth => {
        this.auth = auth;
        this.models = this.route.params
          .switchMap((params: Params) => {
            return this.service.getPeriodicList(this.for_month, this.for_year);
          });
      });

  }

}
