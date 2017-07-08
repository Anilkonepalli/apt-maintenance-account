import { NgModule }								   from '@angular/core';
import { CommonModule }						   from '@angular/common';
import { FormsModule }						   from '@angular/forms';
import { HttpModule }							   from '@angular/http';

import { SummaryRoutingModule }	   from './summary-routing.module';

import { SummaryListComponent } from './summary-list.component';

import { AccountService }					   from './service';
import { UserService } 						from '../users/service';
import { FlatService }            from '../flats/service';
import { ResidentService }        from '../residents/service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SummaryRoutingModule
  ],
  declarations: [
    SummaryListComponent
  ],
  providers: [
    AccountService,
    UserService,
    FlatService,
    ResidentService
  ]
})
export class SummaryModule { }
