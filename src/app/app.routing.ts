import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { maintAcctRoutes } from '../maint-acct/maint-acct.routing';

const appRoutes: Routes = [
	...maintAcctRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
