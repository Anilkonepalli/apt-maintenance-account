import { NgModule }									from '@angular/core';
import { RouterModule, Routes }			from '@angular/router';

import { FlatResidentGridComponent }	  from './grid.component';

const frgRoutes: Routes = [
  { path: '', component: FlatResidentGridComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(frgRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FlatsResidentsGridRoutingModule { }
