import { Component, OnInit } from '@angular/core';

import { Transaction } from './transaction';
import { TransactionDetailComponent } from './transaction-detail.component';

@Component({
	selector: 'transaction-list',
	templateUrl: './transaction-list.component.html'
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
			{"id": 1000, "item": "test item 1", "name": "test name 1"}
		];
	}
}