import { Component, OnInit }				from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable }						from 'rxjs/Observable';

import { Permission }						from './model';
import { PermissionService }				from './service';

var list_css = require('./list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./list.component.html');
var list_html_string = list_html.toString();


@Component({
	selector: 'permission-list',
	styles: [ list_css_string ],
	templateUrl: list_html_string
})
export class PermissionListComponent implements OnInit {

	models: Observable<Permission[]>;

	private selectedId: number;

	//addingAccount: boolean = false;
	//error: any;
	
	constructor(
		private service: PermissionService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
console.log("PermissionListComponent >> ngOnInit()");
		this.models = this.route.params
			.switchMap((params: Params) => {
				this.selectedId = +params['id'];
				console.log("calling service to getList()...");
				return this.service.getList();
			});

	}

	onSelect(model: Permission): void {
		this.router.navigate(['/permissions', model.id]);
	}

	isSelected(model: Permission) {
		return model ? model.id === this.selectedId : false;
	}

	add(): void {
		console.log('adding an permission...');
		console.log(this.models);
		this.router.navigate(['/permissions', 0]); // 0 represent new permission
	}

	delete(model: Permission): void {
		this.service
			.delete(model.id)
			.then( () => { // filter out the deleted permission from roles
				this.models = this.models.filter( (models, i) => {
					return models[i] !== model; 
				});
			});
	}
}