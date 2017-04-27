import { NgModule }								from '@angular/core';
import { CommonModule }						from '@angular/common';
import { FormsModule }						from '@angular/forms';
import { HttpModule }							from '@angular/http';

import { PeriodicListComponent }	from './periodic-list.component';

import { AccountService }					from './service';
import { PeriodicRoutingModule }	from './periodic-routing.module';

import { UserService } 						from '../users/service';
import { FlatService }            from '../flats/service';
import { ResidentService }        from '../residents/service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    PeriodicRoutingModule
  ],
  declarations: [
    PeriodicListComponent
  ],
  providers: [
    AccountService,
    UserService,
    FlatService,
    ResidentService
  ]
})
export class PeriodicModule { }
