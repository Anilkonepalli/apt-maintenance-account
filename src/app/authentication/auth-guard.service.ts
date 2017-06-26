import { Injectable }           from '@angular/core';
import { Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad,
  Route 			 } 							  from '@angular/router';
import { tokenNotExpired } 			from 'angular2-jwt';

import { AuthService     } 			from './auth.service';
import { Logger }		            from '../logger/default-log.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private logger: Logger) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    this.logger.info('auth-guard.service >> canActivate() ...for url: ' + url);
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    this.logger.info('auth-guard.service >> canActivate() ...for url: ' + url);
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    this.logger.info('Auth service loggedIn status: ' + this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) { return true; }
    this.logger.info('Auth service is NOT logged in...');

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy session id
    let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this.logger.info('auth-guard.service >> checkLogin() navigate to login page...');
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
}
