import { Component, EventEmitter, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Transaction } from './transaction';

@Component({
	selector: 'transaction-detail',
	templateUrl: './transaction-detail.component.html'
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
	@Input() transaction: Transaction;
	@Output() close = new EventEmitter();
	error: any;  
	sub: any;
	navigated = false; // true if navigated here

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			if( params['id'] !== undefined){
				let id = +params['id'];
				this.navigated = true;
				//this.transactionService.getTransaction(id).then(transaction => this.transaction = transaction);
			} else {
				this.navigated = false;
				this.transaction = new Transaction();
			}
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
	
	goBack(savedTransaction: Transaction = null) {
		this.close.emit(savedTransaction);
		if(this.navigated) { window.history.back(); }
	}

	save() {

	}
}