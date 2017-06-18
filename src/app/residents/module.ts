import { NgModule }								from '@angular/core';
import { CommonModule }						from '@angular/common';
import { FormsModule }						from '@angular/forms';
import { HttpModule }							from '@angular/http';

import { SharedModule }           from '../shared/shared.module';
import { ResidentsRoutingModule }	from './routing.module';

import { ResidentListComponent }	from './list.component';

import { ResidentService }				from './service';
import { UserService } 						from '../users/service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ResidentsRoutingModule,
    SharedModule
  ],
  declarations: [
    ResidentListComponent,
  ],
  providers: [
    ResidentService,
    UserService
  ]
})
export class ResidentsModule { }
