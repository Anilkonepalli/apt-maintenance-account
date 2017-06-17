import { NgModule } 				from '@angular/core';
import { RouterModule, Routes } 	from '@angular/router';
import { AuthGuardService } 		from './auth-guard.service';
import { AuthService } 				from './auth.service';
import { LoginComponent } 			from './login.component';
import { SocialLoginComponent } from './social/login.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthorizationService } from '../authorization/service';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sociallogin', component: SocialLoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent }
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
