import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }	 from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }		from './app.routing';

import { MaintAcctModule } from '../maint-acct/maint-acct.module';

@NgModule({
  imports:      [ BrowserModule, HttpModule, routing, MaintAcctModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
