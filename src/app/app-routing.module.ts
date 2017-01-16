import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { AuthGuardService } from './auth-guard.service';

//import { maintenanceAccountRoutes } from './maint-acct/maint-acct.routing';
import { MaintenanceAccountComponent } from './maint-acct/maint-acct.component';

const appRoutes: Routes = [
	{ path: '',			component: LoginComponent },
	{ path: 'login', 	component: LoginComponent },
	{ path: 'signup',	component: SignupComponent },
	{ path: 'home', 	component: HomeComponent, canActivate: [AuthGuardService] },
	{ path: 'about', 	component: AboutComponent, canActivate: [AuthGuardService] },
	{ path: 'account', 	component: MaintenanceAccountComponent, canActivate: [AuthGuardService] },
	{ path: '**',		component: LoginComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}