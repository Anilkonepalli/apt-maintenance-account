import { Component, OnInit }				from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable }						from 'rxjs/Observable';

import { Role }							from '../roles/model';
import { Permission }					from '../permissions/model';

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

	attachedaIds: Observable<number[]> = this.attachedStream.map(models => models.map(model =>model.id));

	aIds: Array<number>;  // ids of selected attached models
	dIds: Array<number>;  // ids of selected detached models

	constructor(
		private service: RolePermissionService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.lstream = this.route.params
			.switchMap((params: Params) => {
				//this.lselectedId = +params['id'];
				return this.service.getlmodels();
			});
	
		this.rstream = this.route.params
			.switchMap((params: Params) => {
				return this.service.getrmodels();
			});
	
		this.detachedStream = this.rstream; // initially rstream are in detachedStream
	}

	onlSelect(model: Role): void {
		this.service.getAttachedModels(model.id)
			.then( models => {
				this.attachedStream = Observable.of(models);			
				this.updateDetachedModels();
				return null;
			});
	}

	private updateDetachedModels() {
		let attachedaIds: Array<number>;
		this.attachedStream.subscribe(amodel => {
			attachedaIds = amodel.map(each => each.id);
		});

		this.rstream.subscribe(rmodel => {
			let availablerModels = rmodel.filter(each => !attachedaIds.includes(each.id));
			this.detachedStream = Observable.of(availablerModels);
		});
	}



	attach() {

		let attachedaIds: Array<number>;
console.log('attached aIds'); console.log(this.attachedaIds);
		this.attachedStream.subscribe(amodel => {
			attachedaIds = amodel.map(each => each.id);
		});

		let selecteddIds = this.dIds.map(each => +each); // convert from string to integer

		let newaIds = attachedaIds.concat(selecteddIds); // concatenate existing attached ids with selected dIds

		this.rstream.subscribe(rmodel => {
			let attachedModels = rmodel.filter(each => newaIds.includes(each.id));
			this.attachedStream = Observable.of(attachedModels);
		});

		this.detachedStream.subscribe(dmodel => {
			let newdModels = dmodel.filter(each => !selecteddIds.includes(each.id));	
			this.detachedStream = Observable.of(newdModels);
		});
console.log('attach completes');
	}


/*
	attach() {
		let newIds = this.newIdsToAttach();
		this.updateAttachedModelsWith(newIds);
		this.updateDetachedModels();
	}

	private newIdsToAttach() {
		let attachedaIds: Array<number>;

		this.attachedStream.subscribe(amodel => {
			attachedaIds = amodel.map(each => each.id);
		});

		let selecteddIds = this.dIds.map(each => +each); // convert from string to integer

		let newaIds = attachedaIds.concat(selecteddIds); // concatenate existing attached ids with selected dIds

		return newaIds;
	}

	private updateAttachedModelsWith(newaIds: number[]) {
		this.rstream.subscribe(rmodel => {
			let attachedModels = rmodel.filter(each => newaIds.includes(each.id));
			this.attachedStream = Observable.of(attachedModels);
		});
	}
*/


	detach() {
console.log('Detach selected models...');
	}

	save() {
console.log('Save changes...');
	}

}