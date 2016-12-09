import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaintenanceAccountComponent } from './maint-acct.component';
import { MaintenanceAccountListComponent } from './maint-acct-list.component';
import { MaintenanceAccountDetailComponent } from './maint-acct-detail.component';
import { MaintenanceAccountService } from './maint-acct.service';


@NgModule({
	imports: [ 
		CommonModule, 
		FormsModule 
	],
	declarations: [ 
		MaintenanceAccountComponent, 
		MaintenanceAccountListComponent, 
		MaintenanceAccountDetailComponent 
	],
	exports: [ 
		MaintenanceAccountComponent 
	],
	providers: [ 
		MaintenanceAccountService 
	]
})
export class MaintenanceAccountModule {}