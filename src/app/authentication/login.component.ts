import { Component } 				from '@angular/core';
import { NgForm } 					from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } 				from './auth.service';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styles: [`
		.login {
			width: 40%;
		}`
    ]
})
export class LoginComponent {

    //	message: string;
    errorMessage: string;

    constructor(public authService: AuthService, public router: Router) {
        //		this.setMessage();
    }

    //	setMessage() {
    //		this.message = 'Logged '+ (this.authService.isLoggedIn ? 'in' : 'out');
    //	}

    login(event: String, email: String, password: String) {
        //		this.message = 'Trying to log in ...';

        this.authService.login(event, email, password).subscribe(() => {
            //		this.setMessage();
            if (this.authService.isLoggedIn) {

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
            } else {
                console.log('isLoggedIn >> false');
            }
        });
    }

    cancel() {
        this.router.navigate(['/home']);
    }

    signup() {
        this.router.navigate(['/signup']);
    }
}
