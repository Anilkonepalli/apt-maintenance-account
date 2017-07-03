import { Component }                from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationExtras }                from '@angular/router';

import { Message }                  from '../../shared';
import { environment }              from '../../../environments/environment';

import { Logger }		                from '../../logger/default-log.service';
import { AuthService }              from '../auth.service';


declare const hello: any;

@Component({
  selector: 'social-login',
  templateUrl: 'login.component.html'
})

export class SocialLoginComponent {
  email: String;
  socialToken: String;
  serverToken: String;
  message: Message = new Message();
  network: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private logger: Logger) {
    this.logger.info('constructor() called @SocialLoginComponent...');
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
    console.log('Social Login through: ' + network);
    this.network = network;
    let social = hello(network).login();
    console.log(social);
    let auth = this.authService;
    social.then(this.appLogin(auth, network), this.error);
  }

  appLogin(auth: AuthService, network: String) {
    console.log('Status of social login...'); console.log(status);
    let authResponse = hello(network).getAuthResponse();
    let socialToken = authResponse.access_token;
    console.log('AuthService...'); console.log(auth);
    let result = this.authService.loginToAppUsing(network, socialToken);
    console.log('Result on loginToApp...'); console.log(result);
    result.subscribe(() => {
      console.log('Auth Service now...'); console.log(auth);
      if (auth.isLoggedIn) {
        this.router.navigate(['home']);
      }
    });
  }

  error(err: any) {
    this.logger.error(this.network + ': Sign in error: ' + err.error.message);
  }

  /*
    login(network: string) {
      this.logger.info('Login through Social Network: ' + network);
      hello(network).login().then( // social login here
        () => { // social login is success
          this.logger.info('You have signed in social network: ' + network);
          let authResponse = hello(network).getAuthResponse();
          let socialToken = authResponse.access_token;
          this.authService.loginToAppUsing(network, socialToken).subscribe(() => {
            //        this.redirect(this.authService);
            if (this.authService.isLoggedIn) {
              this.router.navigate(['home']);
            }
          });
        },
        (err: any) => { // failure
          this.logger.error(network + ' sign in error: ' + err.error.message);
        }
      );
    }
  */


  /*  redirect(auth: AuthService) {
      if (auth.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect is set, use the default
        let redirect = auth.redirectUrl ? auth.redirectUrl : 'home';

        /*      // Set our navigation extras object
              // that passes on our global query params and fragment
              let navigationExtras: NavigationExtras = {
                queryParamsHandling: "merge", // "merge", "preserve", "default or /"
                preserveFragment: true
              };
              // Redirect the user
              this.router.navigate([redirect], navigationExtras);
} else { // login failed
  this.message = auth.message;
}
  } */

}
