import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Permission }											from './model';
import { Authorization }									from '../authorization/model';

import { PermissionService }							from './service';
import { Logger }                         from '../logger/default-log.service';

var list_css = require('./list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./list.component.html');
var list_html_string = list_html.toString();

@Component({
  selector: 'permission-list',
  styles: [list_css_string],
  templateUrl: list_html_string
})
export class PermissionListComponent implements OnInit {

  models: Observable<Permission[]>;
  auth: Authorization;
  addAllowed: boolean = false;
  deleteAllowed: boolean = false;
  viewAllowed: boolean = false;
  editAllowed: boolean = false;
  totalRecords: number = 0;
  private selectedId: number;

  constructor(
    private service: PermissionService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger
  ) { }

  ngOnInit(): void {

    this.service.getAuthorization()
      .then(auth => {
        this.logger.info('Inside permission list component...'); this.logger.info(auth);
        if (auth.permissions.length < 1) return []; // just return empty array if permission list is empty
        this.addAllowed = auth.allowsAdd();
        this.deleteAllowed = auth.allowsDelete();
        this.viewAllowed = auth.allowsView();
        this.editAllowed = auth.allowsEdit();
        this.auth = auth;
        this.getList();
      });

  }

  onSelect(model: Permission): void {
    this.router.navigate(['/permissions', model.id]);
  }

  isSelected(model: Permission) {
    return model ? model.id === this.selectedId : false;
  }

  add(): void {
    this.router.navigate(['/permissions', 0]); // 0 represent new permission
  }

  delete(model: Permission): void {
    this.service
      .delete(model.id)
      .then(() => { // filter out the deleted permission from roles
        this.models = this.models.filter((models, i) => {
          return models[i] !== model;
        });
        this.totalRecords--;
      });
  }

  private getList() {
    this.models = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getList();
      });
    this.models.subscribe(models => {
      this.totalRecords = models.length;
    });
  }

}
