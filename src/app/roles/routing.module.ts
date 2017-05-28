import { NgModule }							from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

//import { RoleListComponent }		from './list.component';
//import { RoleDetailComponent }	from './detail.component';
import { RoleComponent }        from './component';

const roleRoutes: Routes = [
  { path: '', component: RoleComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(roleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RolesRoutingModule { }
