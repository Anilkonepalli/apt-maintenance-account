import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaintenanceAccountListComponent } from './maint-acct-list.component';
import { MaintenanceAccountDetailComponent } from './maint-acct-detail.component';

const maintenanceAccountRoutes: Routes = [
	{ path: 'maint-acct-list', component: MaintenanceAccountListComponent },
	{ path: 'maint-acct-detail/:id', component: MaintenanceAccountDetailComponent }
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