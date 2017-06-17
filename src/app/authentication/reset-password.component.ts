import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } 				            from './auth.service';
import { User } 	                        from '../users/model';
import { Logger }                         from '../logger/default-log.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styles: [`
    .reset-password {
      width: 40%;
    }
  `]
})
export class ResetPasswordComponent implements OnInit {
  token: string;

  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger) { }

  ngOnInit() {
    this.token = this.route.params['token']; // url carries a token, get it
    console.log('Token from url: ' + this.token);
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
