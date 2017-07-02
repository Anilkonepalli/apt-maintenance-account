import { NgModule } 				      from '@angular/core';
import { CommonModule }						   from '@angular/common';
import { FormsModule }						   from '@angular/forms';
import { HttpModule }							from '@angular/http';

import { ForgotInfoComponent }    from './forgot-info.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { LoginComponent }           from './login.component';
import { ResetPasswordComponent }   from './reset-password.component';
import { SignupConfirmComponent }   from './signup-confirm.component';
import { SignupInfoComponent }      from './signup-info.component';
import { SignupComponent }          from './signup.component';
import { SocialLoginComponent }     from './social/login.component';

import { LoginRoutingModule }     from './login-routing.module';
import { SignupRoutingModule }    from './signup-routing.module';
import { SharedModule }           from '../shared/shared.module';

import { AuthService } 	from './auth.service';
import { AuthGuardService }       from './auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule,
    SignupRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    SocialLoginComponent,
    SignupComponent,
    SignupInfoComponent,
    SignupConfirmComponent,
    ForgotPasswordComponent,
    ForgotInfoComponent,
    ResetPasswordComponent
  ],
  providers: [
    AuthService,
    AuthGuardService
  ]
})
export class AuthenticationModule { }
