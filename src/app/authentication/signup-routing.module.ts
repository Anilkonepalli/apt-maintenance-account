import { NgModule } 				        from '@angular/core';
import { RouterModule, Routes } 	  from '@angular/router';

import { SignupComponent }          from './signup.component';
import { SignupConfirmComponent }   from './signup-confirm.component';

import { AuthGuardService } 		    from './auth-guard.service';
import { AuthService } 				      from './auth.service';

const signupRoutes: Routes = [
  { path: '', component: SignupComponent },
  { path: ':code', component: SignupConfirmComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(signupRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService,
    AuthService
  ]
})
export class SignupRoutingModule { }
