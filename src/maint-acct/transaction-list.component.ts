import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Transaction } from './transaction';

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

	constructor(private router: Router) {}

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

	onSelect(transaction: Transaction){
		this.selectedTransaction = transaction;
	}
	gotoDetail() {
		this.router.navigate(['/transaction-detail', this.selectedTransaction.id]);
	}
	addTransaction() {
		this.addingTransaction = true;
		this.selectedTransaction = null;
	}
	close(savedTransaction: Transaction) {
		this.addingTransaction = false;
		if(savedTransaction) { this.getTransactions(); }
	}
	deleteTransaction(transaction: Transaction, event: any) {
		//event.stopPropagation();
		
	}
}