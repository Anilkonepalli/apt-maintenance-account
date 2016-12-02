import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  	<h1>{{title}}</h1>
  	<maint-acct></maint-acct>`
})
export class AppComponent  { title = 'XYZ Apartments'; }
