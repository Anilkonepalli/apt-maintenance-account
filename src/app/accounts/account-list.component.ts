import { Component, OnInit }				from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable }						from 'rxjs/Observable';

import { Account }							from './account';
import { AccountService }					from './account.service';

var list_css = require('./account-list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./account-list.component.html');
var list_html_string = list_html.toString();


@Component({
	selector: 'account-list',
	styles: [ list_css_string ],
	templateUrl: list_html_string
})
export class AccountListComponent implements OnInit {

	accounts: Observable<Account[]>;

	private selectedId: number;

	addingAccount: boolean = false;
	error: any;
	
	constructor(
		private service: AccountService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
console.log("AccountListComponent >> ngOnInit()");
		this.accounts = this.route.params
			.switchMap((params: Params) => {
				this.selectedId = +params['id'];
				console.log("calling service to getAccounts()...");
				return this.service.getAccounts();
			});

	}

	onSelect(account: Account): void {
		this.router.navigate(['/accounts', account.id]);
	}

	isSelected(account: Account) {
		return account ? account.id === this.selectedId : false;
	}

	add(): void {
		console.log('adding an account...');
		console.log(this.accounts);
		this.router.navigate(['/accounts', 0]); // 0 represent new account
	}

	delete(account: Account): void {
		this.service
			.delete(account.id)
			.then( () => { // filter out the deleted account from accounts
				this.accounts = this.accounts.filter( (acct, i) => {
					return acct[i] !== account; 
				});
			});
	}
}