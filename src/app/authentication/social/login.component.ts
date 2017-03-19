import { Component } from '@angular/core';

@Component({
    selector: 'social-login',
    templateUrl: 'login.component.html'
})

export class SocialLoginComponent {

    constructor() {
        console.log('constructor() called...');
        hello.init({
            facebook: '988055257994411',
            google: '<Google client id>'
        });
    }


}
