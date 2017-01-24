import { NgModule }				from '@angular/core';
import { CommonModule }			from '@angular/common';
import { FormsModule }			from '@angular/forms';

import { AccountListComponent }	from './account-list.component';
import { AccountDetailComponent } 	from './account-detail.component';

import { AccountService }			from './account.service';
import { AccountsRoutingModule }		from './accounts-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AccountsRoutingModule
	],
	declarations: [
		AccountListComponent,
		AccountDetailComponent
	],
	providers: [
		AccountService
	]
})
export class AccountsModule {}