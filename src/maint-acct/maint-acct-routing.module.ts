import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*import { MaintenanceAccountComponent }		from './maint-acct.component';
import { MaintenanceAccountHomeComponent }	from './maint-acct-home.component';  */
import { MaintenanceAccountListComponent } from './maint-acct-list.component';
import { MaintenanceAccountDetailComponent } from './maint-acct-detail.component';

/*
const maintenanceAccountRoutes: Routes = [
	{
		path: '',
		component: MaintenanceAccountComponent,
		children: [
			{
				path: '',
				component: MaintenanceAccountListComponent,
				children: [
					{
						path: ':id',
						component: MaintenanceAccountDetailComponent
					},
					{
						path: '',
						component: MaintenanceAccountHomeComponent
					}
				]
			}
		]
	}
];
*/

const maintenanceAccountRoutes: Routes = [
	{ path: 'accounts', component: MaintenanceAccountListComponent },
	{ path: 'account/:id', component: MaintenanceAccountDetailComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(maintenanceAccountRoutes)
	],
	exports:[
		RouterModule
	]
})
export class MaintenanceAccountRoutingModule {}