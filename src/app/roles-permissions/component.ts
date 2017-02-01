import { Component, OnInit }				from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable }						from 'rxjs/Observable';

import { Role }							from '../roles/model';
import { Permission }					from '../permissions/model';

//import { RoleService }					from '../roles/service';
//import { PermissionService }			from '../permissions/service';

import { RolePermissionService }		from './service';


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
	//------------------------------------------------------------------------------
	//   Roles (lstream)   |       Permissions (rstream = attached + detached)     |
	//                     |   AttachedStream   |  DetachedStream (or Available List)) |
	//------------------------------------------------------------------------------

	lstream: Observable<Role[]>;  // stream on left side models
	attachedStream: Observable<Permission[]>; 
	detachedStream: Observable<Permission[]>; 
	rstream: Observable<Permission[]>; // rstream holds right side models (attached + detached)

	private lselectedId: number;
	private rselectedIds: Number[];
	
	constructor(
		//private lservice: RoleService,
		//private rservice: PermissionService,
		private service: RolePermissionService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.lstream = this.route.params
			.switchMap((params: Params) => {
				this.lselectedId = +params['id'];
				//return this.lservice.getList();
				return this.service.getlmodels();
			});
	
		this.rstream = this.route.params
			.switchMap((params: Params) => {
				//return this.rservice.getList();
				return this.service.getrmodels();
			});
	
		this.detachedStream = this.rstream; // initially rstream are in detachedStream
	}

	onlSelect(model: Role): void {
		//this.lservice.getMyPermissions(model.id)
		this.service.getAttachedModels(model.id)
			.then( models => {
				this.attachedStream = Observable.of(models);			
				this.updateDetachedModels();
				return null;
			});
	}

	private updateDetachedModels() {
		let attachedIds: Array<number>;
		this.attachedStream.subscribe(amodel => {
			attachedIds = amodel.map(eachModel => eachModel.id);
		});

		let availableModels;
		this.rstream.subscribe(dmodel => {
			availableModels = dmodel.filter(eachModel => !attachedIds.includes(eachModel.id));
			this.detachedStream = Observable.of(availableModels);
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