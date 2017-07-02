import { Component } 			    from '@angular/core';
import { NgForm } 				    from '@angular/forms';
import { Http, Headers } 	    from '@angular/http';
import { Router } 				    from '@angular/router';

import { User } 	            from '../users/model';

import { AuthService } 				from './auth.service';
import { Logger }             from '../logger/default-log.service';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styles: [`
    .signup {
      width: 40%;
    }
    input.ng-valid[required] {
			border-left: 5px solid #42A948; /* green */
		}
		input.ng-invalid {
			border-left: 5px solid #a94442; /* red */
		}
  `]
})
export class SignupComponent {

  constructor(
    private http: Http,
    private router: Router,
    private service: AuthService,
    private logger: Logger) { }

  user = new User();

  saveNewUser() {
    this.service
      .saveNewUser(this.user)
      .subscribe(
      response => {
        this.logger.info('New User is saved ');
        let emailed = response.json().data.emailed;
        this.logger.info('Is an email sent: ' + emailed);
        let data = { emailed: emailed };
        this.router.navigate(['/signup-info'], { queryParams: data });
      },
      error => {
        this.logger.error('Error in saving new user...'); this.logger.error(error.json());
        alert(error.json().data.message);
      });
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
