import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Account }												from './model';
import { AccountService }									from './service';
import { Authorization }									from '../authorization/model';

import 'rxjs/add/operator/switchMap';

var list_css = require('./list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./list.component.html');
var list_html_string = list_html.toString();

interface IColumn {
  name: string,
  displayName: string,
  title: string
}
@Component({
  selector: 'account-list',
  styles: [list_css_string],
  templateUrl: list_html_string
})
export class AccountListComponent implements OnInit {

  models: Observable<Account[]>;
  auth: Authorization;
  addAllowed: boolean = false;
  selectedId: number;
  fromDate: Date;
  toDate: Date = new Date();
  noOfPrevMonths: number = 2;

  columns: IColumn[] = [
    { name: 'recorded_at', displayName: 'Txn Date', title: 'Transaction Date' },
    { name: 'flat_number', displayName: 'Flat#', title: 'Flat Number, if applicable' }
  ];

  selectedColumnNames: string[] = [];
  private router: Router;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.setFromDate();
    this.getList();
    this.setSelectedColumnNames();
  }

  onSelect(model: Account): void {
    this.router.navigate(['/accounts', model.id]);
  }

  isSelected(model: Account) {
    return model ? model.id === this.selectedId : false;
  }

  add(): void {
    this.router.navigate(['/accounts', 0]); // 0 represent new account
  }

  delete(model: Account): void {
    this.service
      .delete(model.id)
      .then(() => { // filter out the deleted account modelfrom account models
        this.models = this.models.filter((models, i) => {
          return models[i] !== model;
        });
      });
  }

  private setFromDate() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() - this.noOfPrevMonths;
    this.fromDate = new Date(year, month, 1)
  }

  public getList() {
    this.service.getAuthorization()
      .then(auth => {
        this.addAllowed = auth.allowsAdd();
        this.auth = auth;

        this.models = this.route.params
          .switchMap((params: Params) => {
            this.selectedId = +params['id'];
            //return this.service.getList();
            return this.service.getListFor(this.fromDate, this.toDate);
          });
      });
  }

  public setSelectedColumnNames() {
    this.columns.forEach((each: IColumn) => {
      this.selectedColumnNames.push(each.name);
    });
    console.log('Selected Column Names are: '); console.log(this.selectedColumnNames);
  }
}
