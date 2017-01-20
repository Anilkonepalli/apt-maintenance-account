import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaintenanceAccountListComponent } from './maint-acct-list.component';
import { MaintenanceAccountDetailComponent } from './maint-acct-detail.component';
import { MaintenanceAccountService } from './maint-acct.service';

import { MaintenanceAccountRoutingModule } from './maint-acct-routing.module';


@NgModule({
	imports: [ 
		CommonModule, 
		FormsModule,
		MaintenanceAccountRoutingModule
	],
	declarations: [ 
		MaintenanceAccountListComponent, 
		MaintenanceAccountDetailComponent 
	],
	providers: [ 
		MaintenanceAccountService 
	]
})
export class MaintenanceAccountModule {}