import { NgModule }								from '@angular/core';
import { CommonModule }						from '@angular/common';
import { FormsModule }						from '@angular/forms';
import { HttpModule }							from '@angular/http';

import { AccountListComponent }		from './list.component';
import { AccountDetailComponent } from './detail.component';

import { AccountService }					from './service';
import { AccountsRoutingModule }	from './routing.module';

import { UserService } 						from '../users/service';
import { FlatService }            from '../flats';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AccountsRoutingModule
    ],
    declarations: [
        AccountListComponent,
        AccountDetailComponent
    ],
    providers: [
        AccountService,
        UserService,
        FlatService
        //        ActivatedRoute,
        //Router
    ]
})
export class AccountsModule { }
