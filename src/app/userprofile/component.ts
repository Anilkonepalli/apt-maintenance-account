import { Component, Input, OnInit } 				from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { UserDetailComponent }              from '../users/detail.component';

import { Authorization }                    from '../authorization/model';
import { User }															from '../users/model';

import { UserProfileService }								from './service';
import { Logger }		                        from '../logger/default-log.service';

@Component({
  selector: 'userprofile',
  templateUrl: '../users/detail.component.html',
  styleUrls: ['../users/detail.component.css']
})
export class UserProfileComponent extends UserDetailComponent {
  title: string = 'Profile';
  userId: string = localStorage.getItem('userId');
  isSocial: boolean = false; // is user logged into app through social network

  constructor(
    protected service: UserProfileService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected location: Location,
    protected logger: Logger
  ) {
    super(service, route, router, location, logger);
  }

  ngOnInit(): void {
    this.service.getUserFor(+this.userId)
      .then((model: User) => {
        this.model = model;
        // console.log('User is: '); console.log(model);
        this.infos = this.infoObjFrom(model.infos);
        if (this.infos.residentType) this.residentTypeSelected = true;
        this.isSocial = model.social_network_id !== null;
        this.authzn = this.service.getAuthzn();
        this.canEdit = this.authzn.allowsEdit(model.id);
        this.hideSave = !this.canEdit;
      });
  }
  goBack(): void {
    this.router.navigate(['/home']);
  }
  cancel(): void {
    this.goBack();
  }
  update(): void {
    // this.model.password = this.password; // empty or modified password
    this.logger.info('Updating user profile...');
    let infos = this.getModifiedInfos();
    if (infos.length > 0) this.model.infos = infos;
    // console.log('Updating User Profile...'); console.log(this.model);
    let passwordModified = this.password ? true : false;
    this.service.update(this.model)
      .then(() => {
        // console.log('password field now: '); console.log(passwordModified);
        if (passwordModified) {
          // if password is modified, after update, logout,
          // so that user can login with new password
          this.service.logout();
        } else {
          this.goBack();
        }
      })
      .catch((error: any) => {
        let jerror = error.json();
        this.logger.error(jerror.data.message);
        alert(jerror.data.message);
      });

  }

}
