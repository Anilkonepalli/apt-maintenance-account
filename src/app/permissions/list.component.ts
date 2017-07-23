import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Permission }											from './model';
import { Authorization }									from '../authorization/model';
import { environment }                    from '../../environments/environment';

import { PermissionService }							from './service';
import { Logger }                         from '../logger/default-log.service';

@Component({
  selector: 'permission-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class PermissionListComponent implements OnInit {

  models: Observable<Permission[]> = Observable.of([]);
  authzn: Authorization;
  addAllowed: boolean = false;
  deleteAllowed: boolean = false;
  viewAllowed: boolean = false;
  editAllowed: boolean = false;
  totalRecords: number = 0;
  private selectedId: number;
  caption: string = 'Permission List of ' + environment.brand;

  constructor(
    private service: PermissionService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger
  ) { }

  ngOnInit(): void {
    this.authzn = this.service.getAuthzn();
    this.logger.info('Inside permission list component...'); this.logger.info(this.authzn);
    if (this.authzn.permissions.length < 1) return; // just return if permission list is empty
    this.addAllowed = this.authzn.allowsAdd();
    this.deleteAllowed = this.authzn.allowsDelete();
    this.viewAllowed = this.authzn.allowsView();
    this.editAllowed = this.authzn.allowsEdit();
    this.getList();
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
