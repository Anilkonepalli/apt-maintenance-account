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
  //token: string;
  pass1: string; // password 1
  pass2: string; // password 2 (aka repeat password)

  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger) { }

  ngOnInit() {
    let params = this.route.params;
    console.log('Params: '); console.log(params);
    //this.token = params['token']; // url carries a token, get it
    //sconsole.log('Token from url: ' + this.token);
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  resetPassword(event: string, pass1: string, pass2: string) {
    console.log('Event is: '); console.log(event);
    console.log('Pass1: '); console.log(this.pass1);
    console.log('Pass2: '); console.log(this.pass2);

    if (this.pass1 !== this.pass2) {
      alert('Passwords do not match');
      return;
    }
    this.route.params
      .switchMap((params: Params) => this.service.resetPassword(params['token'], this.pass1))
      .subscribe(
      response => {
        console.log('Password is reset successfully! App can now be logged in!');
        alert(response.json().data.message);
        this.router.navigate(['/login']);
      },
      error => {
        console.log('Error occurred in resetPassword request...');
        console.log(error);
        alert(error.json().data.message);
      }
      );
  }
}
