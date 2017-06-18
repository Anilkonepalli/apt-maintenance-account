import { NgModule }								from '@angular/core';
import { CommonModule }						from '@angular/common';
import { FormsModule }						from '@angular/forms';
import { HttpModule }							from '@angular/http';

import { SharedModule }           from '../shared/shared.module';
import { FlatsRoutingModule }	    from './routing.module';

import { FlatComponent }          from './list-n-detail.component';

import { UserService } 						from '../users/service';
import { FlatService }					  from './service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    FlatsRoutingModule,
    SharedModule
  ],
  declarations: [
    FlatComponent
  ],
  providers: [
    FlatService,
    UserService
  ]
})
export class FlatsModule { }
