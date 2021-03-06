import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Flat }												    from './model';
import { Authorization }									from '../authorization/model';
import { environment }                    from '../../environments/environment';

import { FlatService }									  from './service';
import { Logger }		                      from '../logger/default-log.service';

@Component({
  selector: 'flats',
  templateUrl: './list-n-detail.component.html',
  styleUrls: ['./list-n-detail.component.css']
})
export class FlatComponent implements OnInit {

  models: Observable<Flat[]> = Observable.of([]);
  authzn: Authorization;
  addAllowed: boolean = false;
  deleteAllowed: boolean = false;
  private selectedId: number;
  model: Flat = new Flat();
  totalRecords: number = 0;
  caption: string = 'Flat List of ' + environment.brand;

  constructor(
    private service: FlatService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger
  ) { }

  ngOnInit(): void {
    this.authzn = this.service.getAuthzn();
    this.logger.info('Inside flats list component...'); this.logger.info(this.authzn);
    if (this.authzn.permissions.length < 1) return; // just return if permission list is empty
    this.addAllowed = this.authzn.allowsAdd();
    this.deleteAllowed = this.authzn.allowsDelete();
    this.getList();
    this.models.subscribe((models) => {
      this.totalRecords = models.length;
    });
  }

  save(): void {
    this.logger.info('Save new Flat Details...');
    this.service.create(this.model)
      .then((model) => {
        this.logger.info('New Flat details added...'); this.logger.info(model);
        this.getList();
        this.model = new Flat(); // reset the fields associated to model
        this.totalRecords++;
      })
      .catch((error: any) => {
        let jerror = error.json();
        this.logger.error('Flat module > list-n-detail component...' + jerror.data.message);
        alert(jerror.data.message);
      });
  }

  delete(model: Flat): void {
    this.service
      .delete(model.id)
      .then(() => { // filter out the deleted flat model from flat models
        this.models = this.models.filter((models, i) => {
          return models[i] !== model;
        });
        this.totalRecords--;
      });
  }

  private getList(): void {
    this.models = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getList();
      });
  }
}
