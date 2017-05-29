import { Component, Input, OnInit } 				from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';
import { IMultiSelectOption,
  IMultiSelectSettings,
  IMultiSelectTexts}                        from 'angular-2-dropdown-multiselect';

import { Role }															from './model';
import { RoleService }											from './service';

import 'rxjs/add/operator/switchMap';

var detail_html = require('./detail.component.html');
var detail_html_string = detail_html.toString();
var detail_css = require('./detail.component.css');
var detail_css_string = detail_css.toString();

@Component({
  selector: 'role-detail',
  templateUrl: detail_html_string,
  styles: [detail_css_string],
})
export class RoleDetailComponent implements OnInit {
  @Input() model: Role;
  modelName: string = 'Role';
  editMode: boolean;
  title: string = this.editMode ? this.modelName + ' Details' : 'Add ' + this.modelName;
  recordId: string = this.editMode ? 'ID - ' + this.model.id : 'ID - 0';

  // for multi select dropdown configuration
  optionsModel: number[] = []; // for Default Selection
  myOptions: IMultiSelectOption[];
  mySettings: IMultiSelectSettings = this.settings();
  myTexts: IMultiSelectTexts = this.texts();

  constructor(
    private service: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {

    let role = this;

    this.route.params
      .switchMap(toGetModel)
      .switchMap(toSetModel)
      .subscribe(toInitializeDropdown);

    function toGetModel(params: Params): Promise<Role> {
      return role.service.getMe(+params['id']);
    }
    function toSetModel(model: Role): Promise<Role[]> {
      role.model = model;
      role.editMode = model.id > 0;
      return role.service.getList();
    }
    function toInitializeDropdown(models: Role[]) {
      role.myOptions = models
        .filter((each: Role) => each.name != role.model.name) // exclude own name
        .map((each: Role, index: number) => { // make available options
          return { id: index, name: each.name };
        });

      role.myOptions.forEach((each: any) => {
        let inh = role.model.inherits;
        if (inh && inh.includes(each.name)) {
          role.optionsModel.push(each.id); // make selected options
        }
      });
    }

  }

  private settings(): IMultiSelectSettings {
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
  private texts(): IMultiSelectTexts {
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
