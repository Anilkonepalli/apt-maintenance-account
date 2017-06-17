import { Component } 			from '@angular/core';
import { Router } 				from '@angular/router';

import { AuthService } 				from './auth.service';
import { Logger }         from '../logger/default-log.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [`
    .forgot-password {
      width: 40%;
    }
  `]
})
export class ForgotPasswordComponent {

  emailed: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private logger: Logger) { }

  cancel() {
    this.router.navigate(['/login']);
  }

  forgotPassword(event: string, email: string) {
    this.authService.forgotPassword(event, email).subscribe(
      response => {
        this.logger.info('Forgot Password submitted successfully...');
        let res = response.json();
        console.log(res);
      },
      error => {
        let err = error.json();
        console.log(err);
      });

    this.router.navigate(['/login']);
  }

}
