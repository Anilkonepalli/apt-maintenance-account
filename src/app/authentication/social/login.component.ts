import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Logger }		          from '../../logger/default-log.service';
import { AuthService }        from '../auth.service';
import { Message }            from '../../shared';


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

    constructor(public authService: AuthService, public router: Router, private logger: Logger) {
        this.logger.info('constructor() called @SocialLoginComponent...');
        hello.init({
            facebook: '988055257994411',
            google: '826489296470-hrm7t6hq57gnurtm5tfbavfk4f04tqaq.apps.googleusercontent.com'
            //}, { scope: 'public_profile, email' });
        }, { scope: 'email' });
    }

    login(network: string) {
        this.logger.info('Social Login network: ' + network);
        hello(network).login().then( // social login here
            () => { // social login is success
                this.logger.info('You are signed into ' + network);
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

        // Auth with our app server using the social token
        this.authService.loginToAppUsing(network, socialToken).subscribe(() => {

            if (this.authService.isSocialLoggedIn) {

                // Get the redirect URL from our auth service
                // If no redirect is set, use the default
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';

                // Set our navigation extras object
                // that passes on our global query params and fragment
                let navigationExtras: NavigationExtras = {
                    preserveQueryParams: true,
                    preserveFragment: true
                };
                this.logger.info('Redirecting to: ...' + redirect);
                // Redirect the user
                this.router.navigate([redirect], navigationExtras);
            } else { // login failed
                this.message = this.authService.message;
            }
        });
    }

}
