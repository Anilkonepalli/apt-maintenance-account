import { NgModule }								from '@angular/core';
import { CommonModule }						from '@angular/common';
import { FormsModule }						from '@angular/forms';
import { HttpModule }							from '@angular/http';

import { ResidentListComponent }		  from './list.component';
import { ResidentDetailComponent }    from './detail.component';

import { ResidentService }					  from './service';
import { ResidentsRoutingModule }	    from './routing.module';

import { UserService } 						    from '../users/service';
import { SharedModule }               from '../shared/shared.module';

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
        ResidentDetailComponent
    ],
    providers: [
        ResidentService,
        UserService
    ]
})
export class ResidentsModule { }
