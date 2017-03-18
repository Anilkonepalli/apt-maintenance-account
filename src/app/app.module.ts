import { NgModule }              from '@angular/core';
import { BrowserModule }         from '@angular/platform-browser';
import { HttpModule }	           from '@angular/http';
import { FormsModule }           from '@angular/forms';

import { AppComponent }          from './app.component';
import { AppRoutingModule }      from './app-routing.module';

import { SharedModule }          from './shared/shared.module';
import { LoginRoutingModule }    from './authentication/login-routing.module';

import { LoginComponent }        from './authentication/login.component';
import { SignupComponent }       from './authentication/signup.component';
import { PageNotFoundComponent } from './not-found.component';

import { HomeComponent }         from './home.component';
import { AboutComponent }        from './about.component';

import { ConsoleLogService }     from './logger/log.service';
import { Logger }                from './logger/default-log.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        LoginRoutingModule,
        SharedModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent,
        AboutComponent,
        PageNotFoundComponent
    ],
    providers: [
        { provide: Logger, useClass: ConsoleLogService }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
