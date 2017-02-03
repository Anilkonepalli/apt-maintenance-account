import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [

	{ path: 'login', 	component: LoginComponent },
	{ path: 'signup',	component: SignupComponent },
	{ path: 'home', 	component: HomeComponent, canActivate: [AuthGuardService] },
	{ path: 'about', 	component: AboutComponent, canActivate: [AuthGuardService] },
	{ path: 'accounts', loadChildren: './accounts/module#AccountsModule', canActivate: [AuthGuardService] },
	{ path: 'users',    loadChildren: './users/module#UsersModule', canActivate: [AuthGuardService] },
	{ path: 'roles',	loadChildren: './roles/module#RolesModule', canActivate: [AuthGuardService] },
	{ path: 'permissions', loadChildren: './permissions/module#PermissionsModule', canActivate: [AuthGuardService]},
	{ path: 'roles-permissions', loadChildren: './roles-permissions/module#RolesPermissionsModule', canActivate: [AuthGuardService]},
	{ path: 'users-roles', loadChildren: './users-roles/module#UsersRolesModule', canActivate: [AuthGuardService]},	
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