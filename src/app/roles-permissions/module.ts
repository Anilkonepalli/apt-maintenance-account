import { NgModule }												from '@angular/core';
import { CommonModule }										from '@angular/common';
import { FormsModule }										from '@angular/forms';

import { RolesPermissionsRoutingModule }	from './routing.module';

import { RolePermissionComponent }				from './component';

import { RoleService }										from '../roles/service';
import { PermissionService }  						from '../permissions/service';
import { RolePermissionService } 					from './service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RolesPermissionsRoutingModule
  ],
  declarations: [
    RolePermissionComponent
  ],
  providers: [
    RoleService,
    PermissionService,
    RolePermissionService
  ]
})
export class RolesPermissionsModule { }
