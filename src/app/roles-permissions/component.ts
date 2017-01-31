import { Component, OnInit }				from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable }						from 'rxjs/Observable';

import { Role }							from '../roles/model';
import { Permission }					from '../permissions/model';

import { RoleService }					from '../roles/service';
import { PermissionService }			from '../permissions/service';


var list_css = require('./component.css');
var list_css_string = list_css.toString();
var list_html = require('./component.html');
var list_html_string = list_html.toString();


@Component({
	selector: 'role-permission',
	styles: [ list_css_string ],
	templateUrl: list_html_string
})
export class RolePermissionComponent implements OnInit {
	//----------------------------------------------------------------------------------
	//   Roles (lmodels)   |       Permissions (rmodels)                               |
	//                     |   Attached (amodels)  |  Available ( = rmodels - amodels) |
	//----------------------------------------------------------------------------------

	lmodels: Observable<Role[]>;  // models on left side list
	amodels: Observable<Permission[]>; // models attached
	rmodels: Observable<Permission[]>; // models on right side list excluding attached models
	rmodels_all: Observable<Permission[]>; // all models on right side

	private lselectedId: number;
	private rselectedIds: Number[];
	
	constructor(
		private lservice: RoleService,
		private rservice: PermissionService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.lmodels = this.route.params
			.switchMap((params: Params) => {
				this.lselectedId = +params['id'];
				return this.lservice.getList();
			});
	
		this.rmodels_all = this.route.params
			.switchMap((params: Params) => {
				return this.rservice.getList();
			});
	
		this.rmodels = this.rmodels_all;
	}

	onlSelect(model: Role): void {
		//this.router.navigate(['/roles', model.id]);
		this.lservice.getMyPermissions(model.id)
			.then( models => {
				this.amodels = Observable.of(models);

				//this.rmodels = this.rmodels_all.filter((anArray, i) => anArray[i].id > 0);

				return null;

			});
	} 
/*
	islSelected(model: Role) {
		return model ? model.id === this.lselectedId : false;
	}
*/
	attach() {

	}

	detach() {

	}

	save() {
		
	}
/*	add(): void {
		this.router.navigate(['/roles', 0]); // 0 represent new role
	}

	delete(model: Role): void {
		this.service
			.delete(model.id)
			.then( () => { // filter out the deleted Role model from role models
				this.models = this.models.filter( (models, i) => {
					return models[i] !== model; 
				});
			});
	} */
}