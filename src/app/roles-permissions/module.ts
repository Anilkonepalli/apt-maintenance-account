import { NgModule }				from '@angular/core';
import { CommonModule }			from '@angular/common';
import { FormsModule }			from '@angular/forms';

import { RolePermissionComponent }			from './component';
//import { RolePermissionService }			from './service';
import { RolesPermissionsRoutingModule }	from './routing.module';

import { RoleService }		from '../roles/service';
import { PermissionService }  from '../permissions/service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RolesPermissionsRoutingModule
	],
	declarations: [
		RolePermissionComponent
	],
	providers: [
		RoleService,
		PermissionService
	]
})
export class RolesPermissionsModule {}