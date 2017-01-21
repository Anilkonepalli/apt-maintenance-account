import { Component, Input, OnInit } 		from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }							from '@angular/common';

import { Account }							from './account';
import { AccountService }					from './account.service';

import 'rxjs/add/operator/switchMap';

var detail_css = require('./account-detail.component.css');
var detail_css_string = detail_css.toString();

@Component({
	selector: 'account-detail',
	templateUrl: './account-detail.component.html',
	styles: [ detail_css_string ],
})
export class AccountDetailComponent implements OnInit {
	@Input() account: Account;
	editMode: boolean = true;

	constructor(
		private service: AccountService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		console.log(" AccountDetailComponent >> ngOnInit() ....");
		this.route.params
			.switchMap((params: Params) => this.service.getAccount(+params['id']))
			.subscribe((account: Account) => {
				this.account = account;
				if(account.id) this.editMode = true; 
				else this.editMode = false;
			});
	}

	goBack(): void {
		this.location.back();
	}

	gotoAccounts() {
		let accountId = this.account ? this.account.id : null;
		this.router.navigate(['/accounts', { id: accountId, foo: 'foo'}]);
	}

	save(): void {
		if(!this.editMode){  // new account to be saved
			console.log('Creating an account...');
			console.log(this.account);
			this.service.create(this.account)
				.then( (acct) => { this.account = acct; this.gotoAccounts(); });
		} else { // changes in existing account to be saved
			this.service.update(this.account)
				.then( () => this.goBack() );
		}
	}
}