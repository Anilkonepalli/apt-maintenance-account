import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } 				            from './auth.service';
import { User } 	                        from '../users/model';
import { Logger }                         from '../logger/default-log.service';

import 'rxjs/add/operator/switchMap';

var signup_html = require('./signup-confirm.component.html');
var signup_html_string = signup_html.toString();

@Component({
  selector: 'signup-confirm',
  template: signup_html_string
})
export class SignupConfirmComponent implements OnInit {

  status: string = 'Unconfirmed';
  message: string = 'Contact Admin User for confirming your signup!'

  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.service.confirmSignup(params['code']))
      .subscribe((model: any) => {
        console.log('confirmed user: ...'); console.log(model);
        this.status = 'Confirmed';
        this.message = 'You can now login to the application.'
      });
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
