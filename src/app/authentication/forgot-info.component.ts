import { Component, OnInit } 			from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Logger }                 from '../logger/default-log.service';

@Component({
  selector: 'forgot-info',
  templateUrl: './forgot-info.component.html',
  styles: [`
    .forgot-info {
      width: 40%;
    }
  `]
})
export class ForgotInfoComponent implements OnInit {

  emailed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.emailed = params['emailed'];
    });
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
