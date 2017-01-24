import { NgModule }					from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { UserListComponent }		from './user-list.component';
import { UserDetailComponent }	from './user-detail.component';

const accountsRoutes: Routes = [
	{ path: '', 	component: UserListComponent	},
	{ path: ':id',	component: UserDetailComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(accountsRoutes)
	],
	exports: [
		RouterModule
	]
})
export class UsersRoutingModule {}