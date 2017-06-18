import { NgModule } 				from '@angular/core';
import { HttpModule }							from '@angular/http';

import { AuthorizationService } 	from './service';

@NgModule({
  exports: [
    HttpModule
  ],
  providers: [
    AuthorizationService
  ]
})
export class AuthorizationModule { }
