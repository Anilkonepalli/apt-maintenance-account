import { Component, Input, OnInit } 				from '@angular/core';
import { FormBuilder, FormGroup }						from '@angular/forms';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';

import { Account }													from './model';
import { AccountService }										from './service';
import { Authorization }										from '../authorization/model';
import { Flat }                             from '../flats/model';
import { Resident }                         from '../residents/model';
import { Month }                            from '../shared';

import 'rxjs/add/operator/switchMap';
import * as _                               from 'lodash';


var detail_html = require('./detail.component.html');
var detail_html_string = detail_html.toString();
var detail_css = require('./detail.component.css');
var detail_css_string = detail_css.toString();

@Component({
  selector: 'account-detail',
  template: detail_html_string,
  styles: [detail_css_string],
})
export class AccountDetailComponent implements OnInit {
  @Input() model: Account;
  recordDate: string = '2017-04-11';
  editMode: boolean = true;
  modelName: string = 'Account';
  auth: Authorization;
  hideSave: boolean = true;
  flats: Flat[];
  months: Month[] = Month.all();
  residents: Resident[];
  residentsAll: Resident[];
  categories: string[] = [
    'Monthly Maintenance',
    'Sweeping',
    'Garbage',
    'Electrical',
    'Plumbing',
    'Septic Tank',
    'Water Tank - Overhead',
    'Water Tank - Sump',
    'Major Maintenance',
    'Others'
  ];
  title: string = this.editMode ? this.modelName + ' details' : 'Add ' + this.modelName;
  accountId: string;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    console.log('initializing accounts detail component...');
    console.log('get authorization...');
    this.service.getAuthorization()
      .then(auth => {
        this.auth = auth;
        this.route.params
          .switchMap((params: Params) => this.service.get(+params['id']))
          .subscribe((model: Account) => {
            this.model = model;
            if (model.id) this.editMode = true;
            else this.editMode = false;
            // this.setRecordDate();
            let canEdit = this.auth.allowsEdit(model.owner_id) && this.editMode;
            let canAdd = this.auth.allowsAdd() && !this.editMode;
            this.hideSave = !(canEdit || canAdd);
            this.accountId = this.editMode ? 'ID - ' + this.model.id : 'ID - 0';
          });
      })
      .catch(err => {
        console.log('Error in Accounts detail components > ngOnInit');
      });
    console.log('getFlatList...');
    this.service.getFlatList()
      .then(flats => {
        console.log('Flat list: '); console.log(flats);
        //this.flats = this.sortedFlats(flats);
        this.flats = _.sortBy(flats, [function(obj: Flat) { return obj.flat_number; }]);
      })
      .catch(err => {
        console.log('error in fetching flats inside Account Detail Component');
      });

    console.log('getResidentList...');
    this.service.getResidentList()
      .then(residents => {
        console.log('Resident List: '); console.log(residents);
        //this.residents = this.sortedResidents(residents);
        this.residents = _.sortBy(residents, [function(obj: Resident) { return obj.first_name; }]);
        this.residentsAll = this.residents;
      })
      .catch(err => {
        console.log('error in retrieving residents in Account Detail Component');
      });
  }

  goBack(): void {
    this.location.back();
  }

  gotoList() {
    let modelId = this.model ? this.model.id : null;
    this.router.navigate(['/accounts', { id: modelId, foo: 'foo' }]);
  }

  save(): void {
    this.editMode ? this.update() : this.add();
  }

  private add(): void {
    this.service.create(this.model)
      .then((model) => {
        this.model = model;
        this.gotoList();
      });
  }

  private update(): void {
    this.service.update(this.model)
      .then(() => this.goBack());
  }
  /*
    private setRecordDate(): void {
      this.recordDate = this.model.recorded_at
        ? new Date(this.model.recorded_at)
        : new Date();
    }
  */

  onFlatNumberChange(event: any) {
    //console.log('detail component >> onFlatNumberChange'); console.log(event);
    let flat = this.flats.find(flat => flat.flat_number === event);
    //console.log('Flat object id: '); console.log(flat.id);
    if (event === 'NA') {
      this.residents = this.residentsAll;
      return;
    }
    this.service.getFlatResidents(flat.id)
      .then(flatResidents => {
        //console.log('FlatResidents are: '); console.log(flatResidents);
        //this.residents = this.sortedResidents(flatResidents);
        this.residents = _.sortBy(flatResidents, [function(obj: Resident) { return obj.first_name; }]);
      })
      .catch(err => {
        console.log('error in retrieving flatResidents in Account Detail Component');
      });
  }

}
