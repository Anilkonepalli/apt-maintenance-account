import { Component, Input, OnInit } 		from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }							from '@angular/common';

import { Account }							from './model';
import { AccountService }					from './service';
import { Authorization }					from '../authorization/model';

import 'rxjs/add/operator/switchMap';

var detail_css = require('./detail.component.css');
var detail_css_string = detail_css.toString();

@Component({
	selector: 'account-detail',
	templateUrl: './detail.component.html',
	styles: [ detail_css_string ],
})
export class AccountDetailComponent implements OnInit {
	@Input() model: Account;
	editMode: boolean = true;
	modelName: string = 'Account';
	auth: Authorization;

	constructor(
		private service: AccountService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.service.get(+params['id']))
			.subscribe((model: Account) => {
				this.model = model;
				if(model.id) this.editMode = true; 
				else this.editMode = false;
			});
		this.service.getAuthorization()
			.then(auth => {
				this.auth = auth;
			});
	}

	goBack(): void {
		this.location.back();
	}

	gotoList() {
		let modelId = this.model ? this.model.id : null;
		this.router.navigate(['/accounts', { id: modelId, foo: 'foo'}]);
	}

	save(): void {
		this.editMode ? this.update() : this.add();
	}

	private add(): void {
		this.service.create(this.model)
			.then( (model) => { 
				this.model = model; 
				this.gotoList(); 
			});		
	}

	private update(): void {
		this.service.update(this.model)
			.then( () => this.goBack() );

	}
}