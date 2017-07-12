import { Component, Input, OnInit } 				from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Authorization }                    from '../authorization/model';
import { User }															from '../users/model';

import { UserProfileService }								from './service';
import { Logger }		                        from '../logger/default-log.service';

@Component({
  selector: 'userprofile',
  templateUrl: './component.html'
})
export class UserProfileComponent implements OnInit {
  @Input() model: User;
  password: string = '';
  title: string = 'Profile';
  private userId: string = localStorage.getItem('userId');
  private authzn: Authorization;
  public allowsEdit: boolean = false;
  public isSocial: boolean = false; // is user logged into app through social network

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
        this.isSocial = model.social_network_id !== null;
        this.authzn = this.service.getAuthzn();
        this.allowsEdit = this.authzn.allowsEdit(+this.userId);
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.model.password = this.password; // empty or modified password
    this.service.update(this.model)
      .then(() => {
        if (this.password) { // if password is modified, after update logout
          // so that user can login with new password
          this.service.logout();
        } else {
          this.goBack();
        }
      });
  }

}
