import { NgModule }								from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { UserProfileComponent }		from './component';

const userProfileRoutes: Routes = [
  { path: '', component: UserProfileComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(userProfileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserProfileRoutingModule { }
