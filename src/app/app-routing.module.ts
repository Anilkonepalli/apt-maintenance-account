import { NgModule } 				       from '@angular/core';
import { RouterModule, Routes } 	 from '@angular/router';

import { PageNotFoundComponent } 	 from './not-found.component';

import { HomeComponent } 			     from './home.component';
import { AboutComponent } 			   from './about.component';
import { LoginComponent } 			   from './authentication/login.component';
import { SocialLoginComponent }    from './authentication/social/login.component';
import { SignupComponent } 			   from './authentication/signup.component';
import { AuthGuardService } 		   from './authentication/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'sociallogin', component: SocialLoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuardService] },
    { path: 'accounts', loadChildren: './accounts/module#AccountsModule', canActivate: [AuthGuardService] },
    { path: 'flats', loadChildren: './flats/module#FlatsModule', canActivate: [AuthGuardService] },
    { path: 'residents', loadChildren: './residents/module#ResidentsModule', canActivate: [AuthGuardService] },
    { path: 'users', loadChildren: './users/module#UsersModule', canActivate: [AuthGuardService] },
    { path: 'roles', loadChildren: './roles/module#RolesModule', canActivate: [AuthGuardService] },
    { path: 'permissions', loadChildren: './permissions/module#PermissionsModule', canActivate: [AuthGuardService] },
    { path: 'flatsresidents', loadChildren: './flats-residents/module#FlatsResidentsModule', canActivate: [AuthGuardService] },
    { path: 'flatsToResidents', loadChildren: './flatsToResidents/module#FlatsResidentsModule', canActivate: [AuthGuardService] },
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
