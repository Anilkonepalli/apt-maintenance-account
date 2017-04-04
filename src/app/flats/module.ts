import { NgModule }								from '@angular/core';
import { CommonModule }						from '@angular/common';
import { FormsModule }						from '@angular/forms';
import { HttpModule }							from '@angular/http';

import { FlatListComponent }		  from './list.component';
import { FlatDetailComponent }    from './detail.component';

import { FlatService }					  from './service';
import { FlatsRoutingModule }	    from './routing.module';

import { UserService } 						from '../users/service';
import { SharedModule }           from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        FlatsRoutingModule,
        SharedModule
    ],
    declarations: [
        FlatListComponent,
        FlatDetailComponent
    ],
    providers: [
        FlatService,
        UserService
    ]
})
export class FlatsModule { }
