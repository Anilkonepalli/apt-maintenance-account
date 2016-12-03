import { Component, OnInit } from '@angular/core';

import { Transaction } from './transaction';
import { TransactionDetailComponent } from './transaction-detail.component';

var list_css = require('./transaction-list.component.css');
var list_css_string = list_css.toString();

@Component({
	selector: 'transaction-list',
	templateUrl: './transaction-list.component.html',
	styles: [list_css_string]
})
export class TransactionListComponent implements OnInit {
	transactions: Transaction[];
	selectedTransaction: Transaction;
	addingTransaction: boolean = false;
	error: any;

	ngOnInit() {
		this.getTransactions();
	}

	getTransactions(){
		this.transactions = [
			{"id": 1001, "item": "test item 1", "name": "test name 1"},
			{"id": 1002, "item": "test item 2", "name": "test name 2"},
			{"id": 1003, "item": "test item 3", "name": "test name 3"}
		];
	}
}