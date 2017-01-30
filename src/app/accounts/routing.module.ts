import { NgModule }					from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { AccountListComponent }		from './list.component';
import { AccountDetailComponent }	from './detail.component';

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