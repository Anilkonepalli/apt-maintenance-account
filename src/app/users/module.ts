import { NgModule }							from '@angular/core';
import { CommonModule }					from '@angular/common';
import { FormsModule }					from '@angular/forms';

import { UserListComponent }		from './list.component';
import { UserDetailComponent } 	from './detail.component';
import { UserService }					from './service';
import { UsersRoutingModule }		from './routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UsersRoutingModule
    ],
    declarations: [
        UserListComponent,
        UserDetailComponent
    ],
    providers: [
        UserService
    ]
})
export class UsersModule { }
