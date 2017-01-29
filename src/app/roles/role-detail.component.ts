import { Component, Input, OnInit } 		from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }							from '@angular/common';

import { Role }							from './role';
import { RoleService }					from './role.service';

import 'rxjs/add/operator/switchMap';

var detail_html = require('./role-detail.component.html');
var detail_html_string = detail_html.toString();
var detail_css = require('./role-detail.component.css');
var detail_css_string = detail_css.toString();

@Component({
	selector: 'role-detail',
	templateUrl: detail_html_string,
	styles: [ detail_css_string ],
})
export class RoleDetailComponent implements OnInit {
	@Input() role: Role;
	editMode: boolean = true;

	constructor(
		private service: RoleService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		console.log(" RoleDetailComponent >> ngOnInit() ....");
		this.route.params
			.switchMap((params: Params) => this.service.getRole(+params['id']))
			.subscribe((role: Role) => {
				this.role = role;
				if(role.id) this.editMode = true; 
				else this.editMode = false;
			});
	}

	goBack(): void {
		this.location.back();
	}

	gotoRoles() {
		let roleId = this.role ? this.role.id : null;
		this.router.navigate(['/roles', { id: roleId, foo: 'foo'}]);
	}

	save(): void {
		this.editMode ? this.update() : this.add();
	}

	private add(): void {
		this.service.create(this.role)
			.then( (aRole) => { 
				this.role = aRole; 
				this.gotoRoles(); 
			});		
	}

	private update(): void {
		this.service.update(this.role)
			.then( () => this.goBack() );
	}
}