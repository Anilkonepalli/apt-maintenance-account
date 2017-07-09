import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as _                             from 'lodash';

import { Authorization }									from '../authorization/model';

import { AccountService }									from './service';

interface Summary {
  yr_mo: string,
  cr: number,
  dr: number,
  diff: number,
  cumulativeDiff: number
}

@Component({
  selector: 'account-summary-list',
  templateUrl: './summary-list.component.html',
  styleUrls: ['./summary-list.component.css']
})
export class SummaryListComponent implements OnInit {

  models: Array<Summary>;
  summary: Observable<any>;
  authzn: Authorization;
  totalRecords: number = 0;
  viewAllowed: boolean = false;
  descending: boolean = false;
  yrMoClass: string;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getList();
  }
  private setYrMoClass() {
    this.yrMoClass = "sortable sort-" + this.descending;
  }
  public getList() {
    this.authzn = this.service.getAuthzn('ACCOUNT_SUMMARY');
    this.viewAllowed = this.authzn.allowsView();

    this.summary = this.route.params
      .switchMap((params: Params) => {
        return this.service.getSummaryList();
      });

    this.summary.subscribe((response: any) => {
      this.models = response.json();
      console.log('Retrieved Summary List:....'); console.log(this.models);
      this.totalRecords = this.models.length;
      this.changeSorting(); // called here, so that when summary screen
      // opens up, list is shown in descending order
    });
  }

  public changeSorting() {
    this.descending = !this.descending;
    this.setYrMoClass(); // as descending is modified, set yrMoClass again
    let yr_mo_order = this.descending ? 'desc' : 'asc';
    this.models = _.orderBy(this.models, ['yr_mo'], [yr_mo_order]);

  }
}
