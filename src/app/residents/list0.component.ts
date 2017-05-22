import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Resident }										    from './model';
import { ResidentService }							  from './service';
import { Authorization }									from '../authorization/model';

import 'rxjs/add/operator/switchMap';

var list_css = require('./list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./list.component.html');
var list_html_string = list_html.toString();


@Component({
  selector: 'resident-list',
  styles: [list_css_string],
  templateUrl: list_html_string
})
export class ResidentListComponent implements OnInit {

  models: Observable<Resident[]>;
  auth: Authorization;
  addAllowed: boolean = false;
  private selectedId: number;

  constructor(
    private service: ResidentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.service.getAuthorization()
      .then(auth => {
        console.log('Inside residents list component...'); console.log(auth);
        if (auth.permissions.length < 1) return []; // just return empty array if permission list is empty
        this.addAllowed = auth.allowsAdd();
        this.auth = auth;

        this.models = this.route.params
          .switchMap((params: Params) => {
            this.selectedId = +params['id'];
            return this.service.getList();
          });
      });
  }

  onSelect(model: Resident): void {
    this.router.navigate(['/residents', model.id]);
  }

  isSelected(model: Resident) {
    return model ? model.id === this.selectedId : false;
  }

  add(): void {
    this.router.navigate(['/residents', 0]); // 0 represent new account
  }

  delete(model: Resident): void {
    this.service
      .delete(model.id)
      .then(() => { // filter out the deleted resident model from resident models
        this.models = this.models.filter((models, i) => {
          return models[i] !== model;
        });
      });
  }
}
