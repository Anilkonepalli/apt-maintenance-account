import { NgModule }				from '@angular/core';
import { CommonModule }			from '@angular/common';
import { FormsModule }			from '@angular/forms';

import { RoleListComponent }	from './role-list.component';
import { RoleDetailComponent } 	from './role-detail.component';
import { RoleService }			from './role.service';
import { RolesRoutingModule }	from './roles-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RolesRoutingModule
	],
	declarations: [
		RoleListComponent,
		RoleDetailComponent
	],
	providers: [
		RoleService
	]
})
export class RolesModule {}