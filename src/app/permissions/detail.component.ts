import { Component, Input, OnInit } 				from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';

import { Permission }												from './model';
import { PermissionService }								from './service';
import { MODULE }                           from '../shared/constants';

import 'rxjs/add/operator/switchMap';

var detail_html = require('./detail.component.html');
var detail_html_string = detail_html.toString();
var detail_css = require('./detail.component.css');
var detail_css_string = detail_css.toString();

@Component({
  selector: 'permission-detail',
  templateUrl: detail_html_string,
  styles: [detail_css_string],
})
export class PermissionDetailComponent implements OnInit {
  @Input() model: Permission;
  modelName: string = 'Permission';
  editMode: boolean = true;
  title: string;
  recordId: string;
  moduleKeys: string[] = Object.keys(MODULE);
  resources: string[] = this.moduleKeys.map((key: string) => MODULE[key]); // collect MODULE values

  // CRUD Operations
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;

  constructor(
    private service: PermissionService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    let self = this;
    self.route.params
      .switchMap((params: Params) => this.service.get(+params['id']))
      .subscribe((model: Permission) => {
        self.model = model;
        self.editMode = model.id > 0;
        self.editMode ? self.editSettings() : self.addSettings();
      });
  }
  private editSettings() {
    this.title = 'Edit ' + this.modelName + ' Details';
    this.recordId = 'ID - ' + this.model.id;
    this.crudSettings(); // apply CRUD data of the model
  }
  private addSettings() {
    this.title = 'Add a new ' + this.modelName;
    this.recordId = 'ID - 0';
  }
  private crudSettings() {
    this.canCreate = this.model.operations.includes('C');
    this.canRead = this.model.operations.includes('R');
    this.canUpdate = this.model.operations.includes('U');
    this.canDelete = this.model.operations.includes('D');
  }
  private crudString() {
    let result = '';
    result += this.canCreate ? 'C' : '';
    result += this.canRead ? 'R' : '';
    result += this.canUpdate ? 'U' : '';
    result += this.canDelete ? 'D' : '';
    return result;
  }
  goBack(): void {
    this.location.back();
  }

  gotoList() {
    let anId = this.model ? this.model.id : null;
    this.router.navigate(['/permissions', { id: anId, foo: 'foo' }]);
  }

  save(): void {
    this.editMode ? this.update() : this.add();
  }

  private add(): void {
    this.model.operations = this.crudString();
    console.log('New Permission to be saved...'); console.log(this.model);
    this.service.create(this.model)
      .then((model: Permission) => {
        this.model = model;
        this.gotoList();
      });
  }

  private update(): void {
    this.model.operations = this.crudString();
    this.service.update(this.model)
      .then(() => this.goBack());
  }
}
