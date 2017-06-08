import { Component, Input, OnInit } 				from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';

import { User }															from '../users/model';
import { UserProfileService }								from './service';
import { Logger }		                        from '../logger/default-log.service';

import 'rxjs/add/operator/switchMap';

var profile_html = require('./component.html');
var profile_html_string = profile_html.toString();

@Component({
  selector: 'userprofile',
  templateUrl: profile_html_string
})
export class UserProfileComponent implements OnInit {
  @Input() model: User;
  title: string = 'Profile';
  userId: string = localStorage.getItem('userId');

  constructor(
    private service: UserProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private logger: Logger
  ) { }

  ngOnInit(): void {
    this.service.getUserFor(+this.userId)
      .then((model: User) => {
        this.model = model;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.service.update(this.model)
      .then(() => this.goBack());
  }

}
