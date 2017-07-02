import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule }	              from '@angular/http';
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }             from './app.component';

import { NavbarComponent }          from './navbar.component';
import { FooterComponent }          from './app-footer.component';
import { AppRoutingModule }         from './app-routing.module';

import { SharedModule }             from './shared/shared.module';
//import { LoginRoutingModule }       from './authentication/login-routing.module';
import { AuthenticationModule }     from './authentication/module';
import { AuthorizationModule }      from './authorization/module';

//import { SignupComponent }          from './authentication/signup.component';
//import { SignupInfoComponent }      from './authentication/signup-info.component';
//import { SignupConfirmComponent }   from './authentication/signup-confirm.component';
//import { SignupRoutingModule }      from './authentication/signup-routing.module';

//import { LoginComponent }           from './authentication/login.component';
//import { SocialLoginComponent }     from './authentication/social/login.component';
//import { ForgotPasswordComponent }  from './authentication/forgot-password.component';
//import { ForgotInfoComponent }      from './authentication/forgot-info.component';
//import { ResetPasswordComponent }   from './authentication/reset-password.component';

import { PageNotFoundComponent }    from './not-found.component';

import { HomeComponent }            from './home.component';
import { AboutComponent }           from './about.component';

import { ConsoleLogService }        from './logger/log.service';
import { Logger }                   from './logger/default-log.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    //LoginRoutingModule,
    //SignupRoutingModule,
    SharedModule,
    NgbModule.forRoot(),
    AuthenticationModule,
    AuthorizationModule
  ],
  declarations: [
    AppComponent,
    //LoginComponent,
    //SignupComponent,
    //SignupInfoComponent,
    //SignupConfirmComponent,
    //ForgotPasswordComponent,
    //ForgotInfoComponent,
    //ResetPasswordComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    //SocialLoginComponent,
    FooterComponent,
    NavbarComponent
  ],
  providers: [
    { provide: Logger, useClass: ConsoleLogService }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
