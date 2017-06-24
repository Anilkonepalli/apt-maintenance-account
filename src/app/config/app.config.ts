import { InjectionToken } from '@angular/core';
// import test from '../../../config/app.json';

// let test = require('../../../config/app.json');

// console.log('test css file: '); console.log(test);

export interface IAppConfig {
  name: string;
  API_URL: string;
}

// define a token or key
export let APP_CONFIG_TOKEN = new InjectionToken<IAppConfig>('app.config');

// define value to the above token or key
export let appConfig: IAppConfig = require('../../../config/app.json');

/*
// define value to the above token or key
export let appConfig: IAppConfig = {
  name: 'Cfg',
  API_URL: 'http://localhost:3002'
};
*/
