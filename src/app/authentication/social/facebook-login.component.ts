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
            appId: '988055257994411',
            cookie: false,  // enable cookies to allow the server to access
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8'
        });
    }
    /*

    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '988055257994411',
          xfbml      : true,
          version    : 'v2.8'
        });
        FB.AppEvents.logPageView();
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    </script>

    */
    onFacebookLoginClick() {
        FB.login((resp: any) => {
            console.log('Response object is: '); console.log(resp);
        });
    }

    statusChangeCallback(resp: any) {
        console.log('Response object is...'); console.log(resp);
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            console.log('Logged In through Facebook...');
        } else if (resp.status === 'not_authorized') {
            console.log('Login through Facebook is NOT AUTHORIZED');
        } else {
            console.log('Not connected to Facebook...');
        }
    };
    ngOnInit() {
        console.log('ngOnInit() called ...');
        FB.getLoginStatus((response: any) => {
            this.statusChangeCallback(response);
        });
    }
}
