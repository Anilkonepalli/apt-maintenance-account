import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } 				            from './auth.service';
import { User } 	                        from '../users/model';
import { Logger }                         from '../logger/default-log.service';

import 'rxjs/add/operator/switchMap';

// var signup_html = require('./signup-confirm.component.html');
// var signup_html_string = signup_html.toString();

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
        console.log('confirmed user: ...'); console.log(response.json());
        this.message = response.json().data.message;
        this.confirmed = true;
      },
      error => {
        console.log('Error: '); console.log(error);
        console.log('Error in json'); console.log(error.json());
        console.log('Error message: '); console.log(error.json().data.message);
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
