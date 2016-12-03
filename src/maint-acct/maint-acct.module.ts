import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaintAcctComponent } from './maint-acct.component';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail.component';


@NgModule({
	imports: [ CommonModule, FormsModule ],
	declarations: [ MaintAcctComponent, TransactionListComponent, TransactionDetailComponent ],
	exports: [ MaintAcctComponent ]
})
export class MaintAcctModule {}