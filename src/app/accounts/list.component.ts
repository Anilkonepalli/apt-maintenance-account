import { Component, OnInit }				from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }						from 'rxjs/Observable';

import { Account }							from './model';
import { AccountService }					from './service';
import { Authorization }					from '../authorization/model';

import 'rxjs/add/operator/switchMap';

var list_css = require('./list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./list.component.html');
var list_html_string = list_html.toString();


@Component({
	selector: 'account-list',
	styles: [ list_css_string ],
	templateUrl: list_html_string
})
export class AccountListComponent implements OnInit {

	models: Observable<Account[]>;

	auth: Authorization;
//	user = Authorization.defaultPermissions; // initialize with defaults so that it opens up html
	addAllowed: boolean = false;

	private selectedId: number;

	constructor(
		private service: AccountService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {

		this.service.getAuthorization()
			.then(auth => {
				//this.user = auth.getUserPermissions();
				this.addAllowed = auth.allowsAdd();
				this.auth = auth;
			});

		this.models = this.route.params
			.delay(500) // this allows completion auth initialization in the above statement.
			.switchMap((params: Params) => {
				this.selectedId = +params['id'];
				return this.service.getList();
			});
	
	}

	onSelect(model: Account): void {
		this.router.navigate(['/accounts', model.id]);
	}

	isSelected(model: Account) {
		return model ? model.id === this.selectedId : false;
	}

	add(): void {
		this.router.navigate(['/accounts', 0]); // 0 represent new account
	}

	delete(model: Account): void {
		this.service
			.delete(model.id)
			.then( () => { // filter out the deleted account modelfrom account models
				this.models = this.models.filter( (models, i) => {
					return models[i] !== model; 
				});
			});
	}
}