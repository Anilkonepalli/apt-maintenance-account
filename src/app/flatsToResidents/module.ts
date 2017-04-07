import { NgModule }												from '@angular/core';
import { CommonModule }										from '@angular/common';
import { FormsModule }										from '@angular/forms';

import { FlatResidentComponent }				  from './component';
import { FlatsResidentsRoutingModule }	  from './routing.module';

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
        FlatResidentService
    ]
})
export class FlatsResidentsModule { }
