import { Component } 			from '@angular/core';
import { Router } 				from '@angular/router';

import { Logger }         from '../logger/default-log.service';

@Component({
  selector: 'signup-info',
  templateUrl: './signup-info.component.html'
})
export class SignupInfoComponent {

  constructor(
    private router: Router,
    private logger: Logger) { }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
