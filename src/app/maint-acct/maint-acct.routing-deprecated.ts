import { Routes } from '@angular/router';

import { MaintenanceAccountListComponent } from './maint-acct-list.component';
import { MaintenanceAccountDetailComponent } from './maint-acct-detail.component';

export const maintenanceAccountRoutes: Routes = [
	{ path: 'maint-acct-list', component: MaintenanceAccountListComponent },
	{ path: 'maint-acct-detail', component: MaintenanceAccountDetailComponent }
]