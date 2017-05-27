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
        /*
                this.models = this.route.params
                  .switchMap((params: Params) => {
                    this.selectedId = +params['id'];
                    return this.service.getList();
                  });   */

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

  /*
    onSelect(model: Resident): void {
      this.router.navigate(['/residents', model.id]);
    }

    isSelected(model: Resident) {
      return model ? model.id === this.selectedId : false;
    }


      add(): void {
        this.router.navigate(['/residents', 0]); // 0 represent new account
      }
    */

  save(): void {
    console.log('Save new Resident Details...');
    this.service.create(this.model)
      .then((model) => {
        console.log('New Resident added...'); console.log(model);
        this.totalResidents++;
        this.getList();
        this.model = new Resident(); // reset the fields associated to model
      })
      .catch((error: any) => {
        let jerror = error.json();
        this.logger.error('Resident module > list component...' + jerror.data.message);
        alert(jerror.data.message);
      });
  }

  delete(model: Resident): void {
    this.service
      .delete(model.id)
      .then(() => { // filter out the deleted resident model from resident models
        this.models = this.models.filter((models, i) => {
          return models[i] !== model;
        });
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

  public saveChanges(model: Resident) {
    console.log('Save Changes...' + model.id); console.log(model);
    this.canEdit[model.id] = false;
    this.editModel = null;

    this.service.update(model)
      .then((model) => {
        console.log('Resident Updated...'); console.log(model);
        this.models.do((each: Resident) => {
          console.log(each);
        });
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
    //this.getList();
  }
}
