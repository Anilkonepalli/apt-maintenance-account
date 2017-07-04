import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';

import { environment }              from '../../../environments/environment';

import { Logger }		                from '../../logger/default-log.service';
import { AuthService }              from '../auth.service';

declare const hello: any;

@Component({
  selector: 'social-login',
  templateUrl: 'login.component.html'
})

export class SocialLoginComponent {

  constructor(
    public authService: AuthService,
    public router: Router,
    private logger: Logger) {
    hello.init(
      {
        facebook: environment.facebook_id,
        google: environment.google_id
      },
      {
        scope: 'email'
      }
    );
  }

  login(network: string) {
    hello(network)
      .login()
      .then(this.appLogin(this.authService, network), this.error);
  }

  appLogin(auth: AuthService, network: string) {
    let authResponse = hello(network).getAuthResponse();
    let token = authResponse.access_token;
    auth
      .loginToAppUsing(network, token)
      .subscribe(() => {
        if (auth.isLoggedIn) {
          this.router.navigate(['home']);
        }
      });
  }

  error(err: any) {
    this.logger.error(': Sign in error: ' + err.error.message);
  }

}
