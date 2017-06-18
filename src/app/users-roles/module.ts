import { NgModule }									from '@angular/core';
import { CommonModule }							from '@angular/common';
import { FormsModule }							from '@angular/forms';

import { UsersRolesRoutingModule }	from './routing.module';

import { UserRoleComponent }				from './component';

import { RoleService }							from '../roles/service';
import { UserService }  						from '../users/service';
import { UserRoleService } 					from './service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRolesRoutingModule
  ],
  declarations: [
    UserRoleComponent
  ],
  providers: [
    RoleService,
    UserService,
    UserRoleService
  ]
})
export class UsersRolesModule { }
