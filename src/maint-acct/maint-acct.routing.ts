import { Routes } from '@angular/router';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail.component';

export const maintAcctRoutes: Routes = [
	{ path: 'transaction-list', component: TransactionListComponent },
	{ path: 'transaction-detail', component: TransactionDetailComponent }
]