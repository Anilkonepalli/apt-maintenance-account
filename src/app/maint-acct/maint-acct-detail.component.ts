import 'rxjs/add/operator/switchMap';
import { Component, EventEmitter, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MaintenanceAccount } from './maint-acct';
import { MaintenanceAccountService } from './maint-acct.service';

@Component({
	selector: 'maint-acct-detail',
	templateUrl: './maint-acct-detail.component.html'
})
export class MaintenanceAccountDetailComponent implements OnInit, OnDestroy {
	@Input() record: MaintenanceAccount;
	@Output() close = new EventEmitter();
	error: any;  
	sub: any;
	navigated = false; // true if navigated here

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: MaintenanceAccountService ) {}

	ngOnInit() {
/*		this.sub = this.route.params.subscribe(params => {
			if( params['id'] !== undefined){
				let id = +params['id'];
				this.navigated = true;
				//this.maintenanceAccountService.getrecord(id).then(record => this.record = record);
			} else {
				this.navigated = false;
				this.record = new MaintenanceAccount();
			}
		}); */

/*		this.sub = this.route.params
			.switchMap((params: Params) => this.service.getRecord(+params['id']))
			.subscribe((record: MaintenanceAccount) => this.record = record); */

		this.sub = this.route.params
			.switchMap((params: Params) => this.service.getRecord(+params['id']))
			.subscribe((record: MaintenanceAccount) => this.record = record);
		
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
	
	goBack(savedRecord: MaintenanceAccount = null) {
		this.close.emit(savedRecord);
		if(this.navigated) { window.history.back(); }
	}

	save() {

	}
}