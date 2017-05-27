import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Resident }										    from './model';
import { ResidentService }							  from './service';
import { Authorization }									from '../authorization/model';
import { Logger }		                      from '../logger/default-log.service';

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
  first_name: string;
  last_name: string;
  is_a: string;
  model: Resident = new Resident();
  totalResidents: number = 0;
  types: string[] = [
    'owner',
    'tenant',
    'relative',
    'friend',
    'guest'
  ];
  canEdit: any = {};
  editModel: Resident;

  constructor(
    private service: ResidentService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger
  ) { }

  ngOnInit(): void {

    this.service.getAuthorization()
      .then(auth => {
        console.log('Inside residents list component...'); console.log(auth);
        if (auth.permissions.length < 1) return []; // just return empty array if permission list is empty
        this.addAllowed = auth.allowsAdd();
        this.auth = auth;
        this.getList();

        this.models.subscribe((models) => {
          // set total residents
          this.totalResidents = models.length;
          // set edit flag on each model; false by default
          models.forEach((each) => {
            this.canEdit[each.id] = false;
          });
        });
      });
  }

  save(): void {
    console.log('Save new Resident Details...');
    this.service.create(this.model)
      .then((model) => {
        console.log('New Resident added...'); console.log(model);
        this.totalResidents++;
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
        console.log('Models on delete...'); console.log(models);
        this.models = this.models.do(res => { }); // just resets the models
        this.totalResidents--;
      });
  }

  private getList(): void {
    this.models = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getList();
      });
  }

  public rowSelected(event: any, model: Resident) {
    console.log('Row clicked...' + model.id);
    console.log(event);

    // disable previous edits, if any
    if (this.editModel) {
      let prevModelId = this.editModel.id;
      this.canEdit[prevModelId] = false;
    }

    this.canEdit[model.id] = true; // toggle edit.id value
    this.editModel = Object.assign({}, model); // assign a copy of model
  }

  public saveChanges(modelWChanges: Resident, modelWOChanges: Resident) {

    console.log('Save Changes...' + modelWChanges.id); console.log(modelWChanges);

    // disable edit mode
    this.canEdit[modelWChanges.id] = false;
    this.editModel = null;

    // save changes into database
    this.service.update(modelWChanges)
      .then((model) => {
        modelWOChanges.first_name = model.first_name; // update the view with changes
      })
      .catch((error: any) => {
        let jerror = error.json();
        this.logger.error('Resident module > list component...' + jerror.data.message);
        alert(jerror.data.message);
      });

  }

  public cancelChanges(model: Resident) {
    console.log('Cancel changes...' + model.id);
    console.log('Changed model...'); console.log(this.editModel);
    this.canEdit[model.id] = false;
    this.editModel = null;
  }
}
