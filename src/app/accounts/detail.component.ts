import { Component, Input, OnInit } 				from '@angular/core';
import { FormBuilder, FormGroup }						from '@angular/forms';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';
import 'rxjs/add/operator/switchMap';
import * as _                               from 'lodash';

import { Account }													from './model';
import { Authorization }										from '../authorization/model';
import { Flat }                             from '../flats/model';
import { Resident }                         from '../residents/model';

import { Month }                            from '../shared';

import { AccountService }										from './service';
import { Logger }		                        from '../logger/default-log.service';

@Component({
  selector: 'account-detail',
  templateUrl: './detail.component.html'
})
export class AccountDetailComponent implements OnInit {
  @Input() model: Account;
  recordDate: string = '2017-04-11';
  editMode: boolean = true;
  modelName: string = 'Account';
  authzn: Authorization;
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
  recordId: string;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private logger: Logger
  ) { }

  ngOnInit(): void {

    this.getFlatList();
    this.getResidentList();
    this.authzn = this.service.getAuthzn();
    this.route.params
      .switchMap((params: Params) => this.service.get(+params['id']))
      .subscribe((model: Account) => {
        this.model = model;
        if (model.id) {
          this.editMode = true;
        } else {
          this.editMode = false;
          let today = new Date();
          let todayString = today.toISOString();
          this.logger.info('Today Date: ' + today); console.log('Today DateString: ' + todayString);
          this.model.recorded_at = todayString.split('T')[0];
        }
        let canEdit = this.authzn.allowsEdit(model.owner_id) && this.editMode;
        let canAdd = this.authzn.allowsAdd() && !this.editMode;
        this.hideSave = !(canEdit || canAdd);
        this.recordId = this.editMode ? 'ID - ' + this.model.id : 'ID - 0';
        if (this.model.flat_number) {
          let flat = this.flats.find(flat => flat.flat_number === this.model.flat_number);
          this.updateResidentListFor(flat);
        }
      });
  }


  /*
    ngOnInit(): void {

      this.getFlatList();
      this.getResidentList();

      this.service.getAuthorization()
        .then(auth => {
          this.auth = auth;
          this.route.params
            .switchMap((params: Params) => this.service.get(+params['id']))
            .subscribe((model: Account) => {
              this.model = model;
              if (model.id) {
                this.editMode = true;
              } else {
                this.editMode = false;
                let today = new Date();
                let todayString = today.toISOString();
                this.logger.info('Today Date: ' + today); console.log('Today DateString: ' + todayString);
                this.model.recorded_at = todayString.split('T')[0];
              }
              let canEdit = this.auth.allowsEdit(model.owner_id) && this.editMode;
              let canAdd = this.auth.allowsAdd() && !this.editMode;
              this.hideSave = !(canEdit || canAdd);
              this.recordId = this.editMode ? 'ID - ' + this.model.id : 'ID - 0';
              if (this.model.flat_number) {
                let flat = this.flats.find(flat => flat.flat_number === this.model.flat_number);
                this.updateResidentListFor(flat);
              }
            });
        })
        .catch(err => {
          this.logger.error('Error in Accounts detail components > ngOnInit');
        });
    }
  */

  private getFlatList() {
    this.logger.info('getFlatList...');
    this.service.getFlatList()
      .then(flats => {
        this.logger.info('Flat list: ');
        this.logger.info(flats);
        this.flats = _.sortBy(flats, [function(obj: Flat) { return obj.flat_number; }]);
      })
      .catch(err => {
        this.logger.error('error in fetching flats inside Account Detail Component');
      });
  }

  private getResidentList() {
    this.logger.info('getResidentList...');
    this.service.getResidentList()
      .then(residents => {
        this.logger.info('Resident List: ');
        this.logger.info(residents);
        this.residentsAll = _.sortBy(residents, [function(obj: Resident) { return obj.first_name; }]);
      })
      .catch(err => {
        this.logger.error('error in retrieving residents in Account Detail Component');
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
    this.model.owner_id = this.identifyOwnerId();
    this.logger.error('Adding New Account Details...');
    this.logger.error(this.model);
    this.service.create(this.model)
      .then((model) => {
        this.model = model;
        this.gotoList();
      });
  }

  private update(): void {
    let newOwnerId = this.identifyOwnerId();
    if (newOwnerId !== this.model.owner_id) {
      this.model.owner_id = newOwnerId;
    }
    this.service.update(this.model)
      .then(() => this.goBack());
  }

  private identifyOwnerId(): number {
    if (!this.model.flat_number) { // no flat number selected
      return 0; // 0 means admin user
    }
    if (this.model.name) { // name is available
      return +this.residents
        .find(each => each.first_name === this.model.name).owner_id;
    }
    if (this.residents.length > 0) { // flat number is selected but name is not selected
      return +this.residents[0].owner_id;
    }
    return 0; // default id
  }

  onFlatNumberChange(event: any) {
    this.logger.info('detail component >> onFlatNumberChange');
    this.logger.info(event);

    if (event === 'NA') {
      this.residents = this.residentsAll;
      return;
    }
    let flat = this.flats.find(flat => flat.flat_number === event);
    this.logger.info('Flat object id: ');
    this.logger.info(flat.id);
    this.updateResidentListFor(flat);
  }

  private updateResidentListFor(flat: Flat) {
    this.service.getFlatResidents(flat.id)
      .then(flatResidents => {
        this.logger.info('FlatResidents are: ');
        this.logger.info(flatResidents);
        this.residents = _.sortBy(flatResidents, [function(obj: Resident) { return obj.first_name; }]);
      })
      .catch(err => {
        this.logger.error('error in retrieving flatResidents in Account Detail Component');
      });
  }

}
