import { Component } 	 from '@angular/core';
import { Router } 		 from '@angular/router';

// import the application components or services
import { Logger }		   from './logger/default-log.service';
import { AuthService } from './authentication/auth.service';

var app_css = require('./app.component.css');
var app_css_string = app_css.toString();

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styles: [app_css_string]
})
export class AppComponent {
  brand = 'ABC Apartments';

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
