import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TestComponent } from './test.component';
import { TestHomeComponent } from './test-home.component';
import { TestListComponent } from './test-list.component';
import { TestDetailComponent } from './test-detail.component';

import { TestRoutingModule} from './test-routing.module';

@NgModule({
	imports: [ CommonModule, FormsModule, TestRoutingModule ],
	declarations: [ TestComponent, TestHomeComponent, TestListComponent, TestDetailComponent ],
})
export class TestModule {}