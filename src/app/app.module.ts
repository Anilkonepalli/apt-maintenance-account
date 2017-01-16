import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }	 from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } 		from './login.component';
import { SignupComponent } 	from './signup.component';
import { LoginRoutingModule } 	from './login-routing.module';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
//import { AuthGuardService } from './auth-guard.service';
//import { routing }		from './app.routing';


import { MaintenanceAccountModule } from './maint-acct/maint-acct.module';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, AppRoutingModule, MaintenanceAccountModule, LoginRoutingModule ],
  declarations: [ AppComponent, LoginComponent, SignupComponent, HomeComponent, AboutComponent ],
  //providers: [ AuthGuardService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
