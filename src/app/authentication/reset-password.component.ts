import { Component }                      from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { User } 	                        from '../users/model';

import { AuthService } 				            from './auth.service';
import { Logger }                         from '../logger/default-log.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styles: [`
    .reset-password {
      width: 40%;
    }
  `]
})
export class ResetPasswordComponent {

  pass1: string; // password 1
  pass2: string; // password 2 (aka repeat password)

  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger) { }

  cancel() {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  resetPassword(event: string, pass1: string, pass2: string) {

    if (this.pass1 !== this.pass2) {
      alert('Passwords do not match');
      return;
    }
    this.route.params
      .switchMap((params: Params) => this.service.resetPassword(params['token'], this.pass1))
      .subscribe(
      response => {
        this.logger.info('Password is reset successfully! App can now be logged in!');
        alert(response.json().data.message);
        this.router.navigate(['/login']);
      },
      error => {
        this.logger.error('Error occurred in resetPassword request...');
        this.logger.error(error);
        alert(error.json().data.message);
      }
      );
  }
}
