import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }	 from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginRoutingModule }   from './login-routing.module';
import { AccountsModule }      from './accounts/accounts.module';

import { LoginComponent } 		from './login.component';
import { SignupComponent } 	from './signup.component';
import { PageNotFoundComponent } from './not-found.component';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';


@NgModule({
  imports:      [ 
  	BrowserModule, 
  	HttpModule, 
  	FormsModule, 
  	AppRoutingModule,
  	LoginRoutingModule,
    AccountsModule
  ],
  declarations: [ 
  	AppComponent, 
  	LoginComponent, 
  	SignupComponent, 
  	HomeComponent, 
  	AboutComponent,
    PageNotFoundComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
