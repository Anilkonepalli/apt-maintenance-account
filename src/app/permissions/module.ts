import { NgModule }										from '@angular/core';
import { CommonModule }								from '@angular/common';
import { FormsModule }								from '@angular/forms';

import { PermissionListComponent }		from './list.component';
import { PermissionDetailComponent } 	from './detail.component';
import { PermissionService }					from './service';
import { PermissionsRoutingModule }		from './routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PermissionsRoutingModule
    ],
    declarations: [
        PermissionListComponent,
        PermissionDetailComponent
    ],
    providers: [
        PermissionService
    ]
})
export class PermissionsModule { }
