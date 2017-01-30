import { Component, OnInit }				from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable }						from 'rxjs/Observable';

import { Role }							from './model';
import { RoleService }					from './service';

var list_css = require('./list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./list.component.html');
var list_html_string = list_html.toString();


@Component({
	selector: 'role-list',
	styles: [ list_css_string ],
	templateUrl: list_html_string
})
export class RoleListComponent implements OnInit {

	models: Observable<Role[]>;

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
		this.models = this.route.params
			.switchMap((params: Params) => {
				this.selectedId = +params['id'];
				console.log("calling Role service to getList()...");
				return this.service.getList();
			});

	}

	onSelect(model: Role): void {
		this.router.navigate(['/roles', model.id]);
	}

	isSelected(model: Role) {
		return model ? model.id === this.selectedId : false;
	}

	add(): void {
		console.log('adding an role...');
		console.log(this.models);
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
	}
}