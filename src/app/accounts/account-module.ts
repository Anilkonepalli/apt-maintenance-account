import { NgModule }								   from '@angular/core';
import { CommonModule }						   from '@angular/common';
import { FormsModule }						   from '@angular/forms';
import { HttpModule }							   from '@angular/http';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AccountsRoutingModule }	   from './account-routing.module';

import { AccountListComponent }		   from './list.component';
import { AccountDetailComponent }    from './detail.component';

import { AccountService }					   from './service';
import { UserService } 						   from '../users/service';
import { FlatService }               from '../flats/service';
import { ResidentService }           from '../residents/service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AccountsRoutingModule,
    MultiselectDropdownModule
  ],
  declarations: [
    AccountListComponent,
    AccountDetailComponent
  ],
  providers: [
    AccountService,
    UserService,
    FlatService,
    ResidentService
  ]
})
export class AccountsModule { }
