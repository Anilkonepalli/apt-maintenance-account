import { NgModule }					from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { RolePermissionComponent }	from './component';

const rpRoutes: Routes = [
	{ path: '', 	component: RolePermissionComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(rpRoutes)
	],
	exports: [
		RouterModule
	]
})
export class RolesPermissionsRoutingModule {}