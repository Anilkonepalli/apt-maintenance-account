import { Component } 	 from '@angular/core';

var app_css = require('./app.component.css');
var app_css_string = app_css.toString();

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styles: [app_css_string]
})
export class AppComponent {
  brand = 'ABC Apartments';
}
