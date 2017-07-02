import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule }	              from '@angular/http';
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule }         from './app-routing.module';
import { SharedModule }             from './shared/shared.module';
import { AuthenticationModule }     from './authentication/module';
import { AuthorizationModule }      from './authorization/module';

import { AppComponent }             from './app.component';
import { HomeComponent }            from './home.component';
import { AboutComponent }           from './about.component';
import { NavbarComponent }          from './navbar.component';
import { FooterComponent }          from './app-footer.component';
import { PageNotFoundComponent }    from './not-found.component';

import { ConsoleLogService }        from './logger/log.service';
import { Logger }                   from './logger/default-log.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    NgbModule.forRoot(),
    AuthenticationModule,
    AuthorizationModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
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
