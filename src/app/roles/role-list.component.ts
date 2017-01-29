import { Component, OnInit }				from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable }						from 'rxjs/Observable';

import { Role }							from './role';
import { RoleService }					from './role.service';

var list_css = require('./role-list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./role-list.component.html');
var list_html_string = list_html.toString();


@Component({
	selector: 'role-list',
	styles: [ list_css_string ],
	templateUrl: list_html_string
})
export class RoleListComponent implements OnInit {

	roles: Observable<Role[]>;

	private selectedId: number;

	//addingAccount: boolean = false;
	//error: any;
	
	constructor(
		private service: RoleService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
console.log("RoleListComponent >> ngOnInit()");
		this.roles = this.route.params
			.switchMap((params: Params) => {
				this.selectedId = +params['id'];
				console.log("calling service to getRoles()...");
				return this.service.getRoles();
			});

	}

	onSelect(role: Role): void {
		this.router.navigate(['/roles', role.id]);
	}

	isSelected(role: Role) {
		return role ? role.id === this.selectedId : false;
	}

	add(): void {
		console.log('adding an role...');
		console.log(this.roles);
		this.router.navigate(['/roles', 0]); // 0 represent new role
	}

	delete(role: Role): void {
		this.service
			.delete(role.id)
			.then( () => { // filter out the deleted role from roles
				this.roles = this.roles.filter( (roles, i) => {
					return roles[i] !== role; 
				});
			});
	}
}