import { NgModule }					from '@angular/core';
import { CommonModule }				from '@angular/common';
import { FormsModule }				from '@angular/forms';

import { AccountListComponent }		from './list.component';
import { AccountDetailComponent } 	from './detail.component';

import { AccountService }			from './service';
import { AccountsRoutingModule }	from './routing.module';

import { UserService } 				from '../users/service';


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
		AccountService,
		UserService
	]
})
export class AccountsModule {}