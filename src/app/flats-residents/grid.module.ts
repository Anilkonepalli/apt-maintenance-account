import { NgModule }												from '@angular/core';
import { CommonModule }										from '@angular/common';
import { FormsModule }										from '@angular/forms';

import { FlatResidentGridComponent }				  from './grid.component';
import { FlatsResidentsGridRoutingModule }	  from './grid-routing.module';

import { FlatService }										from '../flats/service';
import { ResidentService }  						  from '../residents/service';
import { FlatResidentService } 					  from './service';
import { UserService } 						from '../users/service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlatsResidentsGridRoutingModule
  ],
  declarations: [
    FlatResidentGridComponent
  ],
  providers: [
    UserService,
    FlatService,
    ResidentService,
    FlatResidentService
  ]
})
export class FlatsResidentsGridModule { }
