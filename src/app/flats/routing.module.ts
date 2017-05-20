import { NgModule }								from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

/*
import { FlatListComponent }		from './list.component';
import { FlatDetailComponent }	from './detail.component'; */

import { FlatComponent }        from './list-n-detail.component';

/*
const flatsRoutes: Routes = [
      { path: '', component: FlatListComponent },
      { path: ':id', component: FlatDetailComponent }
]; */

const flatsRoutes: Routes = [
  { path: '', component: FlatComponent }
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
