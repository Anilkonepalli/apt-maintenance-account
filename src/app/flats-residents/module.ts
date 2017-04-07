import { NgModule }												from '@angular/core';
import { CommonModule }										from '@angular/common';
import { FormsModule }										from '@angular/forms';

import { FlatResidentComponent }				  from './component';
import { FlatsResidentsRoutingModule }	  from './routing.module';

import { FlatService }										from '../flats/service';
import { ResidentService }  						  from '../residents/service';
import { FlatResidentService } 					  from './service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlatsResidentsRoutingModule
    ],
    declarations: [
        FlatResidentComponent
    ],
    providers: [
        FlatService,
        ResidentService,
        FlatResidentService
    ]
})
export class FlatsResidentsModule { }
