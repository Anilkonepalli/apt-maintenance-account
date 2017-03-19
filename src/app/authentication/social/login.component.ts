import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

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

    constructor(public authService: AuthService, public router: Router) {
        //console.log('constructor() called @SocialLoginComponent...');
        hello.init({
            facebook: '988055257994411',
            google: '<Google client id>' // yet to add actual id
        }, { scope: 'public_profile, email' });

        hello.on('auth.login', this.authenticate);
    }

    authenticate(auth: any) {
        //console.log(' social authenticate(auth) called...');
        //console.log('auth is...'); console.log(auth);
        // Save the social token
        this.socialToken = auth.authResponse.access_token;

        /*      // sample api calls of hello js api("me") gets profile details
                hello(auth.network).api("me")
                    .then((res: any) => {
                        console.log('Response object...'); console.log(res);
                    })
                    .catch((err: any) => {
                        console.log('Error in hello api call to me ' + err);
                    });
        */

        // Auth with our app server using the social token
        this.authService.socialLogin(auth.network, this.socialToken).subscribe(() => {

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

                // Redirect the user
                this.router.navigate([redirect], navigationExtras);
            } else { // login failed
                this.message = this.authService.message;
            }
        });
    }

}
