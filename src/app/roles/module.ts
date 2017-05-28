import { NgModule }							from '@angular/core';
import { CommonModule }					from '@angular/common';
import { FormsModule }					from '@angular/forms';

import { RoleComponent }        from './component';
import { RoleService }					from './service';
import { RolesRoutingModule }		from './routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RolesRoutingModule
  ],
  declarations: [
    RoleComponent
  ],
  providers: [
    RoleService
  ]
})
export class RolesModule { }
