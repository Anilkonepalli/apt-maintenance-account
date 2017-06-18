import { NgModule }								from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { ResidentListComponent }	from './list.component';

const flatsRoutes: Routes = [
  { path: '', component: ResidentListComponent },
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
