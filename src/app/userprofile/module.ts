import { NgModule }							       from '@angular/core';
import { CommonModule }					       from '@angular/common';
import { FormsModule }					       from '@angular/forms';

import { UserProfileComponent }        from './component';
import { UserProfileService }		       from './service';
import { UserProfileRoutingModule }    from './routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserProfileRoutingModule
  ],
  declarations: [
    UserProfileComponent
  ],
  providers: [
    UserProfileService
  ]
})
export class UserProfileModule { }
