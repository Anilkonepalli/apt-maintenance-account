import { NgModule }								from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { ResidentListComponent }		from './list.component';
import { ResidentDetailComponent }	from './detail.component';

const flatsRoutes: Routes = [
    { path: '', component: ResidentListComponent },
    { path: ':id', component: ResidentDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(flatsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ResidentsRoutingModule { }
