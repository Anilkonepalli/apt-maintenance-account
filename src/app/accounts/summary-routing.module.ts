import { NgModule }								from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { SummaryListComponent} from './summary-list.component';

const summaryRoutes: Routes = [
  { path: '', component: SummaryListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(summaryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SummaryRoutingModule { }
