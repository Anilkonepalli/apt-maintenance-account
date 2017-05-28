import { Component, Input, OnInit } 				from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';

import { User }															from './model';
import { UserService }											from './service';
import { Logger }		                        from '../logger/default-log.service';

import 'rxjs/add/operator/switchMap';

var detail_html = require('./detail.component.html');
var detail_html_string = detail_html.toString();
var detail_css = require('./detail.component.css');
var detail_css_string = detail_css.toString();

@Component({
  selector: 'user-detail',
  templateUrl: detail_html_string,
  styles: [detail_css_string],
})
export class UserDetailComponent implements OnInit {
  @Input() model: User;
  editMode: boolean = true;
  modelName: string = 'User';
  title: string = this.editMode ? this.modelName + ' details' : 'Add ' + this.modelName;
  userId: string;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private logger: Logger
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.service.getUserFor(+params['id']))
      .subscribe((model: User) => {
        this.model = model;
        if (model.id) this.editMode = true;
        else this.editMode = false;
        this.userId = this.editMode ? 'ID - ' + this.model.id : 'ID - 0';
      });
  }

  goBack(): void {
    this.location.back();
  }

  gotoList() {
    let modelId = this.model ? this.model.id : null;
    this.router.navigate(['/users', { id: modelId, foo: 'foo' }]);
  }

  save(): void {
    this.editMode ? this.update() : this.add();
  }

  private add(): void {
    this.logger.info('Adding new user...');
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

}
