import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { AuthGuardService } from './auth-guard.service';

//import { AccountListComponent } from './accounts/account-list.component';

//import { maintenanceAccountRoutes } from './maint-acct/maint-acct.routing';
//import { MaintenanceAccountComponent } from './maint-acct/maint-acct.component';

const appRoutes: Routes = [

	{ path: 'login', 	component: LoginComponent },
	{ path: 'signup',	component: SignupComponent },
	{ path: 'home', 	component: HomeComponent, canActivate: [AuthGuardService] },
	{ path: 'about', 	component: AboutComponent, canActivate: [AuthGuardService] },
	//{ path: 'accounts', component: AccountListComponent },
	//{ path: 'test',     loadChildren: './tests/test.module#TestModule' },
	{ path: 'accounts', loadChildren: './accounts/accounts.module#AccountsModule'},

	{ path: '**',		component: PageNotFoundComponent }
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