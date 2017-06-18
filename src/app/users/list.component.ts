import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { User }														from './model';
import { Authorization }									from '../authorization/model';

import { UserService }										from './service';

var list_css = require('./list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./list.component.html');
var list_html_string = list_html.toString();

@Component({
  selector: 'user-list',
  styles: [list_css_string],
  templateUrl: list_html_string
})
export class UserListComponent implements OnInit {

  models: Observable<User[]>;
  auth: Authorization;
  addAllowed: boolean = false;
  private selectedId: number;
  totalRecords: number = 0;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getList();

  }

  onSelect(model: User): void {
    this.router.navigate(['/users', model.id]);
  }

  isSelected(model: User) {
    return model ? model.id === this.selectedId : false;
  }

  add(): void {
    this.router.navigate(['/users', 0]); // 0 represent new user
  }

  delete(model: User): void {
    this.service
      .delete(model.id)
      .then(() => {
        this.models = this.models.do(res => { }); // just resets the models
        this.totalRecords--;
      });
  }

  private getList(): void {
    this.service.getAuthorization()
      .then(auth => {
        this.addAllowed = auth.allowsAdd();
        this.auth = auth;
        this.models = this.route.params
          .switchMap((params: Params) => {
            this.selectedId = +params['id'];
            return this.service.getList();
          });
        this.models.subscribe((models) => {
          this.totalRecords = models.length; // sets total users
        });
      });
  }

}
