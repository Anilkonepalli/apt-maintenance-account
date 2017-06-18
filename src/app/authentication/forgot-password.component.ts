import { Component } 			        from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } 				    from './auth.service';
import { Logger }                 from '../logger/default-log.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger) { }

  cancel() {
    this.router.navigate(['/login']);
  }

  forgotPassword(event: string, email: string) {
    this.authService.forgotPassword(event, email).subscribe(
      response => {
        this.logger.info('Forgot Password submitted successfully...');
        let emailed = response.json().data.emailed;
        this.logger.info('Is an email sent: ' + emailed);
        let data = { emailed: emailed };
        this.router.navigate(['info'], { relativeTo: this.route, queryParams: data });
      },
      error => {
        this.logger.error('Error in saving new user...'); this.logger.error(error.json());
        alert(error.json().data.message);
      });
  }

}
