import { Component, Injector, InjectionToken } 	from '@angular/core';
// import { APP_CONFIG_TOKEN }     from './config/app.config';


/*******************************************************************************
    App Config Setup - Only Defined Here
*******************************************************************************/
export interface IAppConfig {
  name: string;
  API_URL: string;
}
// define a token or key
export let APP_CONFIG_TOKEN = new InjectionToken<IAppConfig>('app.config');

// get value to the above token or key from external file
export let appConfig: IAppConfig = require('../../config/app.json');
/******************************************************************************/

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styles: ['./app.component.css']
})
export class AppComponent {
  brand = 'ABC Apartments';
  /*****************************************************************************
      App Config Usage - For Illustration Purpose only - Use it Across Application
  *****************************************************************************/
  constructor(injector: Injector) {
    const config = injector.get(APP_CONFIG_TOKEN);
    console.log('Config Name: ' + config.name);
    console.log('Config API_URL: ' + config.API_URL);
  }
  /****************************************************************************/
}
