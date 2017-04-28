import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Month }                          from '../shared';

import { Account }												from './model';
import { AccountService }									from './service';
import { Authorization }									from '../authorization/model';

import { Flat }                           from '../flats/model';

import 'rxjs/add/operator/switchMap';
import * as _                             from 'lodash';

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
  months: Month[] = Month.all();
  today: any = new Date();
  for_month: number = this.today.getMonth() + 1;
  for_year: number = this.today.getFullYear();

  models: Observable<Account[]>;
  auth: Authorization;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
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
