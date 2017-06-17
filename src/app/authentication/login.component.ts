import { Component } 				from '@angular/core';
import { NgForm } 					from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } 				from './auth.service';
import { Message }            from '../shared';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: [`
		.login {
			width: 40%;
		};
    `
  ]
})
export class LoginComponent {

  message: Message = new Message();

  constructor(public authService: AuthService, public router: Router) { }

  login(event: String, email: String, password: String) {

    this.authService.login(event, email, password).subscribe(() => {

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
      } else { // login failed
        this.message = this.authService.message;
      }
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  forgot() {
    this.router.navigate(['/forgot']);
  }

}
