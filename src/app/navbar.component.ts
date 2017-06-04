import { Component }    from '@angular/core';
import { Router } 		          from '@angular/router';

import { Logger }		            from './logger/default-log.service';
import { AuthService }          from './authentication/auth.service';
import { Authorization }				from './authorization/model';
import { AuthorizationService } from './authorization/service';
import { Permission } 		      from './permissions/model';

@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  allPermissions: Permission[] = [];

  constructor(
    public router: Router,
    public logger: Logger,
    public authService: AuthService,
    private authznService: AuthorizationService) { }
  /*
    ngOnInit(): void {
      if (this.authService.isLoggedIn) {
        console.log('Retrieving all permissions');
        this.initPerms();
      } else {
        console.log('User Is Not Logged In; so permissions are not retrieved yet...');
      }
    } */

  initializePermissions() {

    this.authznService.getAllPermissions()
      .then((models: Permission[]) => {
        this.allPermissions = models;
        console.log('All Permissions...'); console.log(models);
      });
  }
  isLoggedIn() {
    console.log('navbar component ...' + this.authService.isLoggedIn);
    if (this.authService.isLoggedIn
      && this.allPermissions.length == 0) {
      console.log('getting all permissions for navbar...');
      this.initializePermissions();
    }
    return this.authService.isLoggedIn;
  }
  logout() {
    this.logger.info('Logging out of application @app.component...');
    this.logger.warn('A warning message...');
    this.logger.error('An error message...');

    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
