import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {
  IMultiSelectOption,
  IMultiSelectSettings,
  IMultiSelectTexts}                      from 'angular-2-dropdown-multiselect';

import { Account }												from './model';
import { Authorization }									from '../authorization/model';
import { Month }                          from '../shared';

import { AccountService }									from './service';

interface IColumn {
  name: string,
  displayName: string,
  title: string
}
@Component({
  selector: 'account-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class AccountListComponent implements OnInit {

  models: Observable<Account[]>;
  authzn: Authorization;
  addAllowed: boolean = false;
  selectedId: number;
  fromDate: Date;
  toDate: Date = new Date();
  noOfPrevMonths: number = 2;

  // for multi select dropdown configuration
  optionsModel: number[]; // for Default Selection
  myOptions: IMultiSelectOption[];
  mySettings: IMultiSelectSettings;
  myTexts: IMultiSelectTexts;
  months: Month[] = Month.all();
  totalRecords: number = 0;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setFromDate();
    this.getList();

    this.myOptions = [
      { id: 1, name: 'Txn Date' },
      { id: 2, name: 'Flat#' },
      { id: 3, name: 'Name' },
      { id: 4, name: 'Month' },
      { id: 5, name: 'Year' },
      { id: 6, name: 'Cr/Dr' },
      { id: 7, name: 'Amount' },
      { id: 8, name: 'Balance' },
      { id: 9, name: 'Category' },
    ];

    this.optionsModel = [1, 2, 3, 4, 5, 6, 7, 9]; // default columns shown

    this.mySettings = {
      enableSearch: false,
      checkedStyle: 'checkboxes', // available options: checkboxes, glyphicon, fontawesome
      buttonClasses: 'btn btn-default btn-block',
      dynamicTitleMaxItems: 0,
      displayAllSelectedText: false,
      showCheckAll: true,
      showUncheckAll: true,
      fixedTitle: true
    };

    this.myTexts = {
      checkAll: 'Select All',
      uncheckAll: 'Unselect All',
      checked: 'column selected',
      checkedPlural: 'columns selected',
      searchPlaceholder: 'Find',
      defaultTitle: 'Show Columns',
      allSelected: 'All selected'
    }
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
    this.authzn = this.service.getAuthzn()
    this.addAllowed = this.authzn.allowsAdd();

    this.models = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getListFor(this.fromDate, this.toDate);
      });
    this.models.subscribe((records: Account[]) => {
      this.totalRecords = records.length;
    });
  }

}
