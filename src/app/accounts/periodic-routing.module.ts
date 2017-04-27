import { NgModule }								from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { PeriodicListComponent }	from './periodic-list.component';

const periodicRoutes: Routes = [
  { path: '', component: PeriodicListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(periodicRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PeriodicRoutingModule { }
