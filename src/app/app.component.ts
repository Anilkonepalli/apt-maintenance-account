import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1> <p>Apt Maint Acct Tracking App</p>`,
})
export class AppComponent  { name = 'Angular'; }
