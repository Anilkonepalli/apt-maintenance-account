import { NgModule }								from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { FlatComponent }          from './list-n-detail.component';

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
