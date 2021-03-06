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
import { CATEGORIES }                       from '../shared/constants';

import { AccountService }										from './service';
import { Logger }		                        from '../logger/default-log.service';

@Component({
  selector: 'account-detail',
  templateUrl: './detail.component.html'
})
export class AccountDetailComponent implements OnInit {
  @Input() model: Account;
  editMode: boolean = true;
  modelName: string = 'Account';
  authzn: Authorization;
  hideSave: boolean = true;
  flats: Flat[];
  months: Month[] = Month.all();
  residents: Resident[];
  residentsAll: Resident[];
  categories: string[] = CATEGORIES;
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
    this.authzn = this.service.getAuthzn();
    this.route.params
      .switchMap((params: Params) => this.service.get(+params['id']))
      .subscribe((model: Account) => {
        this.model = model;
        this.initParams();
        this.initFlatsAndResidents();
      });
  }

  initParams() {

    this.logger.info('MODEL while initializing...'); this.logger.info(this.model);

    if (this.model.id) {
      this.editMode = true;
    } else {
      this.editMode = false;
      let today = new Date();
      let todayString = today.toISOString();
      this.logger.info('Today Date: ' + today); console.log('Today DateString: ' + todayString);
      this.model.recorded_at = todayString.split('T')[0];
    }

    let canEdit = this.authzn.allowsEdit(this.model.owner_id) && this.editMode;
    let canAdd = this.authzn.allowsAdd() && !this.editMode;
    this.hideSave = !(canEdit || canAdd);
    this.recordId = this.editMode ? 'ID - ' + this.model.id : 'ID - 0';
  }

  initFlatsAndResidents() {

    this.logger.info('getFlatList...');

    this.service.getFlatList()
      .then(flats => {
        this.flats = _.sortBy(flats, [function(obj: Flat) { return obj.flat_number; }]);
        return this.service.getResidentList();
      })
      .then(residents => {
        this.residentsAll = _.sortBy(residents, [function(obj: Resident) { return obj.first_name; }]);
        if (this.model.flat_number) {
          let flat = this.flats.find(flat => flat.flat_number === this.model.flat_number);
          if (flat) { // if flat is found, then update resident list
            this.updateResidentListFor(flat);
          }
        }
      })
      .catch(error => {
        let jerror = error.json();
        this.logger.error(jerror.data.message);
        alert(jerror.data.message);
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
    this.logger.info('Accounts > details component > add()...');
    this.logger.info(this.model);
    this.model.owner_id = this.identifyOwnerId();
    this.service.create(this.model)
      .then((model) => {
        this.model = model;
        this.gotoList();
      })
      .catch((error: any) => {
        let jerror = error.json();
        this.logger.error(jerror.data.message);
        alert(jerror.data.message);
      });
  }

  private update(): void {
    this.logger.info('Accounts module > detail component...update(..) ');
    let newOwnerId = this.identifyOwnerId();
    if (newOwnerId !== this.model.owner_id) {
      this.model.owner_id = newOwnerId;
    }
    this.service.update(this.model)
      .then(() => this.goBack())
      .catch((error: any) => {
        let jerror = error.json();
        this.logger.error(jerror.data.message);
        alert(jerror.data.message);
      });
  }

  private identifyOwnerId(): number {
    if (!this.model.flat_number) { // no flat number selected or it is empty
      return 0; // 0 means admin user
    }
    this.logger.info('Flat number is: ' + this.model.flat_number);
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
      this.model.flat_number = '';
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
