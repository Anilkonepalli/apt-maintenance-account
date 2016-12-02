import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }	 from '@angular/http';

import { AppComponent }  from './app.component';
import { MaintAcctModule } from '../maint-acct/maint-acct.module';

@NgModule({
  imports:      [ BrowserModule, HttpModule, MaintAcctModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
