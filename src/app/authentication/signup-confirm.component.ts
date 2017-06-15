import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } 				            from './auth.service';
import { User } 	                        from '../users/model';
import { Logger }                         from '../logger/default-log.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'signup-confirm',
  templateUrl: './signup-confirm.component.html'
})
export class SignupConfirmComponent implements OnInit {

  status: string = 'Sign up yet to be confirmed';

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
        this.status = 'Sign up is now confirmed.  You may now login to the application.'
      });
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
