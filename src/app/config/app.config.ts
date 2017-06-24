import { InjectionToken } from '@angular/core';

export interface IAppConfig {
  name: string;
  API_URL: string;
}

export let APP_CONFIG_TOKEN = new InjectionToken<IAppConfig>('app.config'); // a token or key

export let appConfig: IAppConfig = { // value to the above token or key
  name: 'Cfg',
  API_URL: 'http://localhost:3002'
};
