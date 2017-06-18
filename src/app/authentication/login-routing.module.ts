import { NgModule } 				from '@angular/core';
import { RouterModule, Routes } 	from '@angular/router';

import { LoginComponent } 			from './login.component';
import { SocialLoginComponent } from './social/login.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotInfoComponent } from './forgot-info.component';
import { ResetPasswordComponent } from './reset-password.component';

import { AuthGuardService } 		from './auth-guard.service';
import { AuthService } 				from './auth.service';
import { AuthorizationService } from '../authorization/service';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sociallogin', component: SocialLoginComponent },
  { path: 'login/forgot', component: ForgotPasswordComponent },
  { path: 'login/reset/:token', component: ResetPasswordComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    AuthorizationService
  ]
})
export class LoginRoutingModule { }
