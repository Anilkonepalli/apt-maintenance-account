import { NgModule }										from '@angular/core';
import { RouterModule, Routes }				from '@angular/router';

import { PermissionListComponent }		from './list.component';
import { PermissionDetailComponent }	from './detail.component';

const permissionRoutes: Routes = [
    { path: '', component: PermissionListComponent },
    { path: ':id', component: PermissionDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(permissionRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PermissionsRoutingModule { }
