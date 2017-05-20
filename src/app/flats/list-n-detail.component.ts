import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Flat }												from './model';
import { FlatService }									from './service';
import { Authorization }									from '../authorization/model';

import 'rxjs/add/operator/switchMap';

var list_css = require('./list-n-detail.component.css');
var list_css_string = list_css.toString();
var list_html = require('./list-n-detail.component.html');
var list_html_string = list_html.toString();


@Component({
  selector: 'flat',
  styles: [list_css_string],
  templateUrl: list_html_string
})
export class FlatComponent implements OnInit {

  models: Observable<Flat[]>;
  auth: Authorization;
  addAllowed: boolean = false;
  private selectedId: number;
  model: Flat = new Flat();

  constructor(
    private service: FlatService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.service.getAuthorization()
      .then(auth => {
        console.log('Inside flats list component...'); console.log(auth);
        if (auth.permissions.length < 1) return []; // just return empty array if permission list is empty
        this.addAllowed = auth.allowsAdd();
        this.auth = auth;
        this.getList();
        /*        this.models = this.route.params
                  .switchMap((params: Params) => {
                    this.selectedId = +params['id'];
                    return this.service.getList();
                  }); */
      });
  }


  onSelect(model: Flat): void {
    this.router.navigate(['/flats', model.id]);
  }

  isSelected(model: Flat) {
    return model ? model.id === this.selectedId : false;
  }

  add(): void {
    this.router.navigate(['/flats', 0]); // 0 represent new account
  }

  save(): void {
    console.log('Save new Flat Details...');
    this.service.create(this.model)
      .then((model) => {
        console.log('New Flat details added...'); console.log(model);
        this.getList();
      });
  }

  delete(model: Flat): void {
    this.service
      .delete(model.id)
      .then(() => { // filter out the deleted flat model from flat models
        this.models = this.models.filter((models, i) => {
          return models[i] !== model;
        });
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
