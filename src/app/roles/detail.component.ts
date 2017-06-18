import { Component, Input, OnInit } 				from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';
import { IMultiSelectOption,
  IMultiSelectSettings,
  IMultiSelectTexts}                        from 'angular-2-dropdown-multiselect';
import 'rxjs/add/operator/switchMap';

import { Role }															from './model';
import { Authorization }										from '../authorization/model';

import { RoleService }											from './service';
import { Logger }                           from '../logger/default-log.service';

@Component({
  selector: 'role-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class RoleDetailComponent implements OnInit {
  @Input() model: Role;
  modelName: string = 'Role';
  authzn: Authorization;
  editMode: boolean;
  addAllowed: boolean = false;
  editAllowed: boolean = false;
  title: string;
  recordId: string;

  // for multi select dropdown configuration
  optionsModel: number[] = []; // for Default Selection
  myOptions: IMultiSelectOption[];
  mySettings: IMultiSelectSettings = this.dropdownSettings();
  myTexts: IMultiSelectTexts = this.dropdownTexts();

  constructor(
    private service: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private logger: Logger
  ) { }

  ngOnInit(): void {
    let self = this;
    this.authzn = this.service.getAuthzn();
    this.route.params
      .switchMap(toGetModel)
      .switchMap(toSetModel)
      .subscribe(toInitializeDropdown);

    function toGetModel(params: Params): Promise<Role> {
      return self.service.getMe(+params['id']);
    }
    function toSetModel(model: Role): Promise<Role[]> {
      self.model = model;
      self.editMode = model.id > 0;
      self.editMode ? self.editSettings() : self.addSettings();
      return self.service.getList();
    }
    function toInitializeDropdown(models: Role[]) {
      self.myOptions = models
        .filter((each: Role) => each.name != self.model.name) // exclude own name
        .map((each: Role, index: number) => { // make available options
          return { id: index, name: each.name };
        });

      self.myOptions.forEach((each: any) => {
        let inh = self.model.inherits;
        if (inh && inh.includes(each.name)) {
          self.optionsModel.push(each.id); // make selected options
        }
      });
    }

  }
  private editSettings() {
    this.recordId = 'ID - ' + this.model.id;
    this.editAllowed = this.authzn.allowsEdit();
    this.title = this.editAllowed ? 'Edit ' : '';
    this.title += this.modelName + ' Details';
  }
  private addSettings() {
    this.title = 'Add a new ' + this.modelName;
    this.recordId = 'ID - 0';
    this.addAllowed = this.authzn.allowsAdd();
  }
  private dropdownSettings(): IMultiSelectSettings {
    return {
      enableSearch: false,
      checkedStyle: 'checkboxes', // available options: checkboxes, glyphicon, fontawesome
      buttonClasses: 'btn btn-default btn-block',
      dynamicTitleMaxItems: 2,
      displayAllSelectedText: true,
      showCheckAll: true,
      showUncheckAll: true,
      fixedTitle: false
    };
  }
  private dropdownTexts(): IMultiSelectTexts {
    return {
      checkAll: 'Select All',
      uncheckAll: 'Unselect All',
      checked: 'role',
      checkedPlural: 'roles',
      searchPlaceholder: 'Find',
      defaultTitle: 'No Roles',
      allSelected: 'All Roles'
    };
  }

  goBack(): void {
    this.location.back();
  }

  gotoList() {
    let modelId = this.model ? this.model.id : null;
    this.router.navigate(['/roles', { id: modelId, foo: 'foo' }]);
  }

  save(): void {
    this.editMode ? this.update() : this.add();
  }

  private add(): void {
    this.model.inherits = this.selectedOptions();
    this.service.create(this.model)
      .then((model) => {
        this.model = model;
        this.gotoList();
      });
  }

  private update(): void {
    let selOp = this.selectedOptions();
    if (this.model.inherits !== selOp) {
      this.model.inherits = selOp;
    }
    this.service.update(this.model)
      .then(() => this.goBack());
  }

  // name of the inherited options are combined into one string but comma separated
  // so that it can be stored in the database
  private selectedOptions(): string {
    let result = '';
    this.myOptions.forEach((each: IMultiSelectOption) => {
      if (this.optionsModel.includes(each.id)) {
        result += result ? ", " + each.name : each.name;
      }
    });
    return result;
  }

}
