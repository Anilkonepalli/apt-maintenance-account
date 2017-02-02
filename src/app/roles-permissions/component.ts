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
			.then( amodels => {
				this.attachedStream = Observable.of(amodels);
				let attachedaIds = amodels.map(amodel => amodel.id);
				this.updateDetachedModelsExcluding(attachedaIds);
				return null;
			});
	}

/*	private updateDetachedModels() {
		let attachedaIds: Array<number>;
		this.attachedStream.subscribe(amodel => {
			attachedaIds = amodel.map(each => each.id);
		});

		this.rstream.subscribe(rmodel => {
			let availablerModels = rmodel.filter(each => !attachedaIds.includes(each.id));
			this.detachedStream = Observable.of(availablerModels);
		});
console.log('Update Detached Models completes');
	}
*/

/*
	attach() {

		let attachedaIds: Array<number>;

		this.attachedStream.subscribe(amodel => {  // get ids of attached models
			attachedaIds = amodel.map(each => each.id);
		});

		let selecteddIds = this.dIds.map(each => +each); // convert from string to integer

		let newaIds = attachedaIds.concat(selecteddIds); // concatenate existing attached ids with selected dIds

		this.rstream.subscribe(rmodel => { // update attached models
			let attachedModels = rmodel.filter(each => newaIds.includes(each.id));
			this.attachedStream = Observable.of(attachedModels);
		});

		this.detachedStream.subscribe(dmodel => { // update detached models
			let newdModels = dmodel.filter(each => !selecteddIds.includes(each.id));	
			this.detachedStream = Observable.of(newdModels);
		});
console.log('attach completes');
	}
*/

	attach() {
		this.detachedStream.subscribe(dmodel => {
			let dIdNums = this.dIds.map(each => +each); // convert string id into integer
			let dmodels = dmodel.filter(each => !dIdNums.includes(each.id));
			this.detachedStream = Observable.of(dmodels);

			let dIdsNew = dmodels.map(dmodel => dmodel.id); // collect aIds of new amodels
			this.updateAttachedModelsExcluding(dIdsNew);
		});
	}

	detach() {
console.log('Detach selected models...');
		this.attachedStream.subscribe(amodel => {   // remove the selected items from attached models
			
			let aIdsNums = this.aIds.map(each => +each); // convert string id into integer
			let amodels = amodel.filter(each => !aIdsNums.includes(each.id)); // filter out selected amodels
			this.attachedStream = Observable.of(amodels); // update attached stream after filtering
			
			let aIdsNew = amodels.map(amodel => amodel.id); // collect aIds of new amodels
			this.updateDetachedModelsExcluding(aIdsNew); // now, dmodels = rmodels - amodels
		});
	}

	private updateDetachedModelsExcluding(attachedaIds: number[]){
		this.rstream.subscribe(rmodel => {
			let availablerModels = rmodel.filter(each => !attachedaIds.includes(each.id));
			this.detachedStream = Observable.of(availablerModels);
		});
console.log('Update Detached Models excluding attachedaIds completes');
	}


	private updateAttachedModelsExcluding(attacheddIds: number[]){
		this.rstream.subscribe(rmodel => {
			let availablerModels = rmodel.filter(each => !attacheddIds.includes(each.id));
			this.attachedStream = Observable.of(availablerModels);
		});
console.log('Update Attached Models excluding attachedaIds completes');
	}


	save() {
console.log('Save changes...');
	}

}