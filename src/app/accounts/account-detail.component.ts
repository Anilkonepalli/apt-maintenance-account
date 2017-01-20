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
			.subscribe((account: Account) => this.account = account);
	}

	goBack(): void {
		this.location.back();
	}

	gotoAccounts() {
		let accountId = this.account ? this.account.id : null;
		this.router.navigate(['/accounts', { id: accountId, foo: 'foo'}]);
	}
}