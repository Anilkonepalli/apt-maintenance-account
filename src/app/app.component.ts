import { Component } 	 from '@angular/core';
import { Router } 		 from '@angular/router';

// import the application components or services
import { Logger }		   from './logger/default-log.service';
import { AuthService } from './authentication/auth.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'XYZ Apartments';
    //jwt: string = ''; // initialize with an empty string

    //	user: any;

    constructor(public router: Router, public logger: Logger, public authService: AuthService) {
        //this.jwt = localStorage.getItem('id_token');
        //this.logger.info('Testing Logger in AppComponent...');
        //this.user = localStorage.getItem('user');
    }

    logout() {
        this.logger.info('Logging out of application @app.component...');
        this.logger.warn('A warning message...');
        this.logger.error('An error message...');
        //localStorage.removeItem('id_token');
        //localStorage.removeItem('user');
        //this.jwt = '';
        //this.user = '';
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
