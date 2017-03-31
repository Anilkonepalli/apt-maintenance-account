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
