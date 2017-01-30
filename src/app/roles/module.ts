import { NgModule }				from '@angular/core';
import { CommonModule }			from '@angular/common';
import { FormsModule }			from '@angular/forms';

import { RoleListComponent }	from './list.component';
import { RoleDetailComponent } 	from './detail.component';
import { RoleService }			from './service';
import { RolesRoutingModule }	from './routing.module';

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