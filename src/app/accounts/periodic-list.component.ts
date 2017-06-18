import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as _                             from 'lodash';

import { Account }												from './model';
import { Authorization }									from '../authorization/model';
import { Flat }                           from '../flats/model';

import { Month }                          from '../shared';

import { AccountService }									from './service';
import { Logger }		                      from '../logger/default-log.service';

@Component({
  selector: 'account-periodic-list',
  templateUrl: './periodic-list.component.html',
  styleUrls: ['./periodic-list.component.css']
})
export class PeriodicListComponent implements OnInit {
  months: Month[] = Month.all();
  today: any = new Date();
  for_month: number = this.today.getMonth() + 1;
  for_year: number = this.today.getFullYear();
  monthlyMaintCharge = 600;

  models: Observable<Account[]>;
  authzn: Authorization;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger
  ) { }

  ngOnInit(): void {
    this.service.getAuthorization()
      .then(authzn => {
        this.authzn = authzn;
        this.models = this.route.params
          .switchMap((params: Params) => {
            return this.service.getPeriodicList(this.for_month, this.for_year);
          });
      });
  }
  togglePaidStatus(event: any, model: Account): void {
    if (!this.authzn.allowsCRUD()) {
      alert('Permission Denied');
      return;
    }
    this.logger.info('toggle paid status event: '); this.logger.info(event);
    this.logger.info('toggle paid status model: '); this.logger.info(model);
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
      .then((acct) => this.logger.info('Saved account'));
  }
  removeAccount(model: Account) {
    model.amount = 0;
    if (model.id != 0) {
      this.service.delete(model.id)
        .then((acct) => this.logger.info('Account Deleted'));
    }
    model.id = 0;
  }
  getPeriodicList(month: number, year: number) {
    this.service.getPeriodicList(month, year)
      .then((models) => {
        this.logger.info('new periodic list...'); this.logger.info(models);
        this.models = Observable.of(models);
      });
  }
  monthChanged(event: any) {
    this.logger.info('periodic list >> Month changed...'); this.logger.info(event);
    this.getPeriodicList(this.for_month, this.for_year);
  }
  yearChanged(event: any) {
    this.logger.info('periodic list >> Year changed...'); this.logger.info(event);
    this.getPeriodicList(this.for_month, this.for_year);
  }
  gotoPreviousMonth(event: any) {
    this.logger.info('periodic list >> gotoPreviousMonth...'); this.logger.info(event);
    --this.for_month;
    if (this.for_month == 0) {
      this.for_month = 12;
      --this.for_year;
    }
    this.getPeriodicList(this.for_month, this.for_year);
  }
  gotoNextMonth(event: any) {
    this.logger.info('periodic list >> gotoPreviousMonth...'); this.logger.info(event);
    ++this.for_month;
    if (this.for_month == 13) {
      this.for_month = 1;
      ++this.for_year;
    }
    this.getPeriodicList(this.for_month, this.for_year);
  }


}
