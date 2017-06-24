import { Component, Injector } 	 from '@angular/core';
import { APP_CONFIG_TOKEN } from './config/app.config';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styles: ['./app.component.css']
})
export class AppComponent {
  brand = 'ABC Apartments';
  constructor(injector: Injector) {
    const config = injector.get(APP_CONFIG_TOKEN);
    console.log('Config Name: ' + config.name);
    console.log('Config API_URL: ' + config.API_URL);
  }
}
