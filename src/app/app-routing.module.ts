import { NgModule } 				       from '@angular/core';
import { RouterModule, Routes } 	 from '@angular/router';

import { PageNotFoundComponent } 	 from './not-found.component';

import { HomeComponent } 			     from './home.component';
import { AboutComponent } 			   from './about.component';
import { LoginComponent } 			   from './authentication/login.component';
import { SocialLoginComponent }    from './authentication/social/login.component';
import { SignupComponent } 			   from './authentication/signup.component';
import { SignupInfoComponent }     from './authentication/signup-info.component';
import { SignupConfirmComponent }  from './authentication/signup-confirm.component';
import { ForgotPasswordComponent } from './authentication/forgot-password.component';
import { ForgotInfoComponent }     from './authentication/forgot-info.component';
import { AuthGuardService } 		   from './authentication/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/forgot', component: ForgotPasswordComponent },
  { path: 'login/forgot/info', component: ForgotInfoComponent },
  { path: 'sociallogin', component: SocialLoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-info', component: SignupInfoComponent },
  { path: 'signup/:code', component: SignupConfirmComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'accounts', loadChildren: './accounts/account-module#AccountsModule', canActivate: [AuthGuardService] },
  { path: 'accounts-periodic', loadChildren: './accounts/periodic-module#PeriodicModule', canActivate: [AuthGuardService] },
  { path: 'flats', loadChildren: './flats/module#FlatsModule', canActivate: [AuthGuardService] },
  { path: 'residents', loadChildren: './residents/module#ResidentsModule', canActivate: [AuthGuardService] },
  { path: 'flats-residents', loadChildren: './flats-residents/module#FlatsResidentsModule', canActivate: [AuthGuardService] },
  { path: 'users', loadChildren: './users/module#UsersModule', canActivate: [AuthGuardService] },
  { path: 'userprofile', loadChildren: './userprofile/module#UserProfileModule', canActivate: [AuthGuardService] },
  { path: 'roles', loadChildren: './roles/module#RolesModule', canActivate: [AuthGuardService] },
  { path: 'permissions', loadChildren: './permissions/module#PermissionsModule', canActivate: [AuthGuardService] },
  { path: 'roles-permissions', loadChildren: './roles-permissions/module#RolesPermissionsModule', canActivate: [AuthGuardService] },
  { path: 'users-roles', loadChildren: './users-roles/module#UsersRolesModule', canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
