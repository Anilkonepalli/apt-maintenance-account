import { NgModule }								from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { FlatListComponent }		from './list.component';
import { FlatDetailComponent }	from './detail.component';

const flatsRoutes: Routes = [
    { path: '', component: FlatListComponent },
    { path: ':id', component: FlatDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(flatsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FlatsRoutingModule { }
