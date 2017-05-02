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
  monthlyMaintCharge = 600;

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
  togglePaidStatus(event: any, model: Account) {
    console.log('toggle paid status event: '); console.log(event);
    console.log('toggle paid status model: '); console.log(model);
    model.amount != this.monthlyMaintCharge
      ? this.addAccount(model)
      : this.removeAccount(model);
  }
  addAccount(model: Account) {
    model.amount = this.monthlyMaintCharge;
    model.crdr = 'cr';
    model.category = 'Monthly Maintenance';
    model.remarks = 'paid'
    this.service.create(model)
      .then((acct) => console.log('Saved account'));
  }
  removeAccount(model: Account) {
    model.amount = 0;
    if (model.id != 0) {
      this.service.delete(model.id)
        .then((acct) => console.log('Account Deleted'));
    }
    model.id = 0;
  }
  getPeriodicList(month: number, year: number) {
    this.service.getPeriodicList(month, year)
      .then((models) => {
        console.log('new periodic list...'); console.log(models);
        this.models = Observable.of(models);
      });
  }
  monthChanged(event: any) {
    console.log('periodic list >> Month changed...'); console.log(event);
    this.getPeriodicList(this.for_month, this.for_year);
  }
  yearChanged(event: any) {
    console.log('periodic list >> Year changed...'); console.log(event);
    this.getPeriodicList(this.for_month, this.for_year);
  }
  gotoPreviousMonth(event: any) {
    console.log('periodic list >> gotoPreviousMonth...'); console.log(event);
    --this.for_month;
    if (this.for_month == 0) {
      this.for_month = 12;
      --this.for_year;
    }
    this.getPeriodicList(this.for_month, this.for_year);
  }
  gotoNextMonth(event: any) {
    console.log('periodic list >> gotoPreviousMonth...'); console.log(event);
    ++this.for_month;
    if (this.for_month == 13) {
      this.for_month = 1;
      ++this.for_year;
    }
    this.getPeriodicList(this.for_month, this.for_year);
  }


}
