import { Component, Injector, InjectionToken } 	from '@angular/core';
// import { APP_CONFIG_TOKEN }     from './config/app.config';


/*******************************************************************************
    App Config Setup
*******************************************************************************/
export interface IAppConfig {
  name: string;
  API_URL: string;
}
// define a token or key
export let APP_CONFIG_TOKEN = new InjectionToken<IAppConfig>('app.config');

// define value to the above token or key
export let appConfig: IAppConfig = require('../../config/app.json');
/******************************************************************************/

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styles: ['./app.component.css']
})
export class AppComponent {
  brand = 'ABC Apartments';
  constructor(injector: Injector) {  // Usage of App Config
    const config = injector.get(APP_CONFIG_TOKEN);
    console.log('Config Name: ' + config.name);
    console.log('Config API_URL: ' + config.API_URL);
  }
}
