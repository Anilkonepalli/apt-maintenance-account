import { Component, Input, OnInit } 				from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Authorization }                    from '../authorization/model';
import { User }															from '../users/model';

import { MODULE }                           from '../shared/constants';

import { UserProfileService }								from './service';
import { Logger }		                        from '../logger/default-log.service';
import { AuthorizationService }             from '../authorization/service';

var profile_html = require('./component.html');
var profile_html_string = profile_html.toString();

@Component({
  selector: 'userprofile',
  templateUrl: profile_html_string
})
export class UserProfileComponent implements OnInit {
  @Input() model: User;
  title: string = 'Profile';
  private userId: string = localStorage.getItem('userId');
  private authzn: Authorization;
  public allowsEdit: boolean = false;

  constructor(
    private service: UserProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private logger: Logger,
    private authznService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.service.getUserFor(+this.userId)
      .then((model: User) => {
        this.model = model;
        this.authzn = this.authznService.auths[MODULE.USER_PROFILE.name];
        this.allowsEdit = this.authzn.allowsEdit(+this.userId);
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
