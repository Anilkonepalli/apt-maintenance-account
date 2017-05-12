import { Component } from '@angular/core';
import { Router } 		 from '@angular/router';

import { Logger }		   from './logger/default-log.service';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  constructor(public router: Router,
    public logger: Logger,
    public authService: AuthService) { }

  logout() {
    this.logger.info('Logging out of application @app.component...');
    this.logger.warn('A warning message...');
    this.logger.error('An error message...');

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
