import { NgModule }					from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { AccountComponent }			from './account.component';
import { AccountHomeComponent }		from './account-home.component';
import { AccountListComponent }		from './account-list.component';
import { AccountDetailComponent }	from './account-detail.component';

const accountsRoutes: Routes = [
	{ path: '', 	component: AccountListComponent	},
	{ path: ':id',	component: AccountDetailComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(accountsRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AccountsRoutingModule {}