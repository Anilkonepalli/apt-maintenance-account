import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Resident }										    from './model';
import { User }                           from '../users/model';
import { Authorization }									from '../authorization/model';
import { environment }                    from '../../environments/environment';

import { ResidentService }							  from './service';
import { Logger }		                      from '../logger/default-log.service';

@Component({
  selector: 'resident-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ResidentListComponent implements OnInit {

  models: Observable<Resident[]> = Observable.of([]);
  authzn: Authorization;
  addAllowed: boolean = false;
  deleteAllowed: boolean = false;
  private selectedId: number;
  first_name: string;
  last_name: string;
  is_a: string;
  model: Resident = new Resident();
  totalRecords: number = 0;
  types: string[] = [
    'owner',
    'tenant',
    'relative',
    'friend',
    'guest'
  ];
  canEdit: any = {};
  editModel: Resident;
  users: User[];
  caption: string = 'Resident List of ' + environment.brand;

  constructor(
    private service: ResidentService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger
  ) { }


  ngOnInit(): void {
    this.authzn = this.service.getAuthzn();
    this.logger.info('Inside residents list component...'); this.logger.info(this.authzn);
    if (this.authzn.permissions.length < 1) return; // just return if permission list is empty
    this.addAllowed = this.authzn.allowsAdd();
    this.deleteAllowed = this.authzn.allowsDelete();
    this.getList();
    this.getUsers();
    this.models.subscribe((models) => {
      // set total residents
      this.totalRecords = models.length;
      // set edit flag on each model; false by default
      models.forEach((each) => {
        this.canEdit[each.id] = false;
      });
    });
  }

  save(): void {
    this.logger.info('Save new Resident Details...');
    this.service.create(this.model)
      .then((model) => {
        this.logger.info('New Resident added...'); this.logger.info(model);
        this.totalRecords++;
        this.models = this.models.do(res => { }); // just resets the models
        this.model = new Resident(); // reset the fields associated to model
      })
      .catch((error: any) => {
        let jerror = error.json();
        this.logger.error('Resident module > list component...' + jerror.data.message);
        alert(jerror.data.message);
      });
  }

  delete(model: Resident, models: Resident[]): void {
    this.service
      .delete(model.id)
      .then(() => {
        this.logger.info('Models on delete...'); this.logger.info(models);
        this.models = this.models.do(res => { }); // just resets the models
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

  private getUsers(): void {
    this.service.getUsers()
      .then((models: User[]) => {
        this.users = models;
        this.logger.info('User List: '); this.logger.info(this.users);
      });
  }

  public rowSelected(event: any, model: Resident) {
    this.logger.info('Row clicked...' + model.id);
    this.logger.info(event);

    // disable previous edits, if any
    if (this.editModel) {
      let prevModelId = this.editModel.id;
      this.canEdit[prevModelId] = false;
    }

    this.canEdit[model.id] = true; // toggle edit.id value
    this.editModel = Object.assign({}, model); // assign a copy of model
  }

  public saveChanges(modelWChanges: Resident, modelWOChanges: Resident) {

    this.logger.info('Save Changes...' + modelWChanges.id); this.logger.info(modelWChanges);

    // disable edit mode
    this.canEdit[modelWChanges.id] = false;
    this.editModel = null;

    // save changes into database
    this.service.update(modelWChanges)
      .then((model) => {
        modelWOChanges.first_name = model.first_name; // update the view with changes
        modelWOChanges.last_name = model.last_name;
        modelWOChanges.is_a = model.is_a;
        modelWOChanges.occupied_on = model.occupied_on;
        modelWOChanges.vacated_on = model.vacated_on;
        modelWOChanges.owner_id = model.owner_id;
      })
      .catch((error: any) => {
        let jerror = error.json();
        this.logger.error('Resident module > list component...' + jerror.data.message);
        alert(jerror.data.message);
      });

  }

  public cancelChanges(model: Resident) {
    this.logger.info('Cancel changes...' + model.id);
    this.logger.info('Changed model...'); this.logger.info(this.editModel);
    this.canEdit[model.id] = false;
    this.editModel = null;
  }

  public userName(ownerId: number) {
    // console.log('OwnerId: ' + ownerId);
    return ownerId ? this.users.find((each: User) => each.id == ownerId).name : 'admin';
  }

}
