import { Component } 			from '@angular/core';
import { NgForm } 				from '@angular/forms';
import { Http, Headers } 	from '@angular/http';
import { Router } 				from '@angular/router';

import { User, SampleUser1 } 	from '../users/model';
import { Logger }         from '../logger/default-log.service';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styles: [
    `.ng-valid[required] {
			border-left: 5px solid #42A948; /* green */
		}

		.ng-invalid {
			border-left: 5px solid #a94442; /* red */
		}`
  ]
})
export class SignupComponent {

  constructor(
    private http: Http,
    private router: Router,
    private logger: Logger) { }

  //user = new User();
  user = SampleUser1;

  saveNewUser() {
    let data = JSON.stringify(this.user);
    let url = 'http://localhost:3002/api/users';
    this.logger.info('Saving new user through url: ' + url);
    this.logger.info('Save new user data: '); this.logger.info(data);
    this.http
      .post(url, data, { headers: contentHeaders })
      .subscribe(
      response => {
        this.logger.info('New User is saved ');
        alert('New User is saved!');
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
