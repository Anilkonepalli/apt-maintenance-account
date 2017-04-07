import { NgModule }									from '@angular/core';
import { RouterModule, Routes }			from '@angular/router';

import { FlatResidentComponent }	  from './component';

const frRoutes: Routes = [
    { path: '', component: FlatResidentComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(frRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FlatsResidentsRoutingModule { }
