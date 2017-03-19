import {Component, OnInit} from '@angular/core';

declare const FB: any;

@Component({
    selector: 'facebook-login',
    templateUrl: 'facebooklogin.html'
})

export class FacebookLoginComponent implements OnInit {

    constructor() {
        console.log('constructor() called...');
        FB.init({
            appId: '988055257994411', // get it by registering this app at https://developers.facebook.com
            cookie: false,  // enable cookies to allow the server to access
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8'
        });
    }

    onFacebookLoginClick() {
        FB.login((resp: any) => {
            console.log('Response object is: '); console.log(resp);
            if (resp.status === 'connected') {
                // Logged into app and Facebook
            } else {
                // user is NOT LOGGED into this app OR Unable to tell
            }
        }, { scope: 'public_profile, email' });
    }

    onFacebookLogoutClick() {
        FB.logout((resp: any) => {
            console.log('Response object is: '); console.log(resp);
            // user is now logged out
        });
    }

    statusChangeCallback(resp: any) {
        console.log('Response object is...'); console.log(resp);
        if (resp.status === 'connected') { // user has already logged into Facebook as well as this app
            // connect here with your server for facebook login by passing access token given by facebook
            console.log('Logged In through Facebook...');
        } else if (resp.status === 'not_authorized') { // user has logged into Facebook but yet to login to this app
            console.log('Login through Facebook is NOT AUTHORIZED');
        } else { // resp.status === 'unknown' it means that user is not logged into Facebook
            console.log('Not connected to Facebook...');
        }
    };
    ngOnInit() {
        console.log('ngOnInit() called ...');
        // check if user is already logged into app with Facebook credentials
        FB.getLoginStatus((response: any) => {
            this.statusChangeCallback(response);
        });
    }
}
