import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test.component';
import { TestHomeComponent } from './test-home.component';
import { TestListComponent } from './test-list.component';
import { TestDetailComponent } from './test-detail.component';

const testRoutes: Routes = [
	{
		path: '',
		component: TestComponent,
		children: [
			{
				path: '',
				component: TestListComponent,
				children: [
					{
						path: ':id',
						component: TestDetailComponent
					},
					{
						path: '',
						component: TestHomeComponent
					}
				]
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(testRoutes) ],
	exports: [ RouterModule ]
})
export class TestRoutingModule {}