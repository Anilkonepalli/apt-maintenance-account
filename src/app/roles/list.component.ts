import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Role }														from './model';
import { RoleService }										from './service';

import 'rxjs/add/operator/switchMap';

var list_css = require('./list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./list.component.html');
var list_html_string = list_html.toString();


@Component({
  selector: 'role-list',
  styles: [list_css_string],
  templateUrl: list_html_string
})
export class RoleListComponent implements OnInit {

  models: Observable<Role[]>;
  totalRecords: number = 0;
  private selectedId: number;

  constructor(
    private service: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.models = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getList();
      });
    this.models.subscribe(models => {
      this.totalRecords = models.length;
    });
  }

  onSelect(model: Role): void {
    this.router.navigate(['/roles', model.id]);
  }

  isSelected(model: Role) {
    return model ? model.id === this.selectedId : false;
  }

  add(): void {
    this.router.navigate(['/roles', 0]); // 0 represent new role
  }

  delete(model: Role): void {
    this.service
      .delete(model.id)
      .then(() => { // filter out the deleted Role model from role models
        this.models = this.models.filter((models, i) => {
          return models[i] !== model;
        });
        this.totalRecords--;
      });
  }
}
