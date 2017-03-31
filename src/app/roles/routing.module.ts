import { NgModule }							from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { RoleListComponent }		from './list.component';
import { RoleDetailComponent }	from './detail.component';

const roleRoutes: Routes = [
    { path: '', component: RoleListComponent },
    { path: ':id', component: RoleDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(roleRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RolesRoutingModule { }
