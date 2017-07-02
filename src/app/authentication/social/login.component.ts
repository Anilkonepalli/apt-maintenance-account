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
    this.logger.info('Login through Social Network: ' + network);
    hello(network).login().then( // social login here
      () => { // social login is success
        this.logger.info('You have signed in social network: ' + network);
        let authResponse = hello(network).getAuthResponse();
        this.loginToAppUsing(network, authResponse); // now login to Application using social response
      },
      (err: any) => { // failure
        this.logger.error(network + ' sign in error: ' + err.error.message);
      }
    );
  }

  loginToAppUsing(network: String, authResponse: any) {
    // Save the social token
    let socialToken = authResponse.access_token;
    this.logger.info('call authService...'); this.logger.info(this.authService);
    // Auth with our app server using the social token
    this.authService.loginToAppUsing(network, socialToken).subscribe(() => {
      console.log('check point B');
      if (this.authService.isLoggedIn) {
        console.log('check point C');
        // Get the redirect URL from our auth service
        // If no redirect is set, use the default
        console.log('Redirect Url: '); console.log(this.authService.redirectUrl);
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
        console.log('Redirect is: ' + redirect);
        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          // preserveQueryParams: true,
          queryParamsHandling: "merge", // "merge", "preserve", "default or /"
          preserveFragment: true
        };
        console.log('Auth Service: '); console.log(this.authService);
        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      } else { // login failed
        console.log('check point D');
        this.logger.error('Social Login Failed!');
        this.message = this.authService.message;
      }
    });
  }

}
