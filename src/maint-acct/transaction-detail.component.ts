import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Transaction } from './transaction';

@Component({
	selector: 'transaction-detail',
	templateUrl: './transaction-detail.component.html'
})
export class TransactionDetailComponent {
	@Input() transaction: Transaction;

	error: any;
	sub: any;
	navigated = false; // true if navigated here
}