import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { User }														from './model';
import { Authorization }									from '../authorization/model';

import { UserService }										from './service';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class UserListComponent implements OnInit {

  models: Observable<User[]>;
  authzn: Authorization;
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
    this.authzn = this.service.getAuthzn();
    this.addAllowed = this.authzn.allowsAdd();
    this.models = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getList();
      });
    this.models.subscribe((models) => {
      this.totalRecords = models.length; // sets total users
    });
  }

}
