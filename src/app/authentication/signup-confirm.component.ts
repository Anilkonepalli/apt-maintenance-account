import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { User } 	                        from '../users/model';

import { AuthService } 				            from './auth.service';
import { Logger }                         from '../logger/default-log.service';

@Component({
  selector: 'signup-confirm',
  templateUrl: './signup-confirm.component.html',
  styles: [`
    .signup-confirm {
      width: 40%;
    }
    .confirmed {
      background-color: green;
      color: white;
    }
    .unconfirmed {
      background-color: red;
      color: white;
    }
  `]
})
export class SignupConfirmComponent implements OnInit {

  confirmed: boolean = false;
  message: string = 'Sign up process is yet to be completed.';

  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.service.confirmSignup(params['code']))
      .subscribe(
      response => {
        this.logger.info('confirmed user: ...'); this.logger.info(response.json());
        this.message = response.json().data.message;
        this.confirmed = true;
      },
      error => {
        this.logger.error('Error: '); this.logger.error(error);
        this.logger.error('Error in json'); this.logger.error(error.json());
        this.logger.error('Error message: '); this.logger.error(error.json().data.message);
        this.message = error.json().data.message;
        this.confirmed = false;
      }
      );
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
