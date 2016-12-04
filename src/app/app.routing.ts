import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { AuthGuardService } from './auth-guard.service';

import { maintAcctRoutes } from '../maint-acct/maint-acct.routing';
import { MaintAcctComponent } from '../maint-acct/maint-acct.component';

const appRoutes: Routes = [
	{ path: '',			component: LoginComponent },
	{ path: 'login', 	component: LoginComponent },
	{ path: 'signup',	component: SignupComponent },
	{ path: 'home', 	component: HomeComponent, canActivate: [AuthGuardService] },
	{ path: 'about', 	component: AboutComponent, canActivate: [AuthGuardService] },
	{ path: 'account', 	component: MaintAcctComponent },
	{ path: '**',		component: LoginComponent }
];

const allRoutes: Routes = [
	...appRoutes,
	...maintAcctRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(allRoutes);
