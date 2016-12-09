import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaintenanceAccount } from './maint-acct';
import { MaintenanceAccountService } from './maint-acct.service';

var list_css = require('./maint-acct-list.component.css');
var list_css_string = list_css.toString();

@Component({
	selector: 'maint-acct-list',
	templateUrl: './maint-acct-list.component.html',
	styles: [list_css_string]
})

export class MaintenanceAccountListComponent implements OnInit {
	records: MaintenanceAccount[];
	selectedRecord: MaintenanceAccount;
	addingRecord: boolean = false;
	error: any;

//	constructor(private router: Router){};
	constructor(private router: Router, 
				private maintenanceAccountService: MaintenanceAccountService) {}

	ngOnInit() {
		this.getRecords();
	}

	getRecords() {
		console.log('maint-acct-list.component >>> getRecords()...');
		this.maintenanceAccountService.getRecords().then(records => {
			this.records = records;
		})
	}
/*
	getRecords(){
		this.records = [
			new MaintenanceAccount(),
			new MaintenanceAccount()
			//{"id": 1001, "item": "test item 1", "name": "test name 1"},
			//{"id": 1002, "item": "test item 2", "name": "test name 2"},
			//{"id": 1003, "item": "test item 3", "name": "test name 3"}
		];
	}
*/
	onSelect(record: MaintenanceAccount){
		this.selectedRecord = record;
	}
	gotoDetail() {
		this.router.navigate(['/maint-acct-detail', this.selectedRecord.id]);
	}
	addRecord() {
		this.addingRecord = true;
		this.selectedRecord = null;
	}
	close(savedRecord: MaintenanceAccount) {
		this.addingRecord = false;
		if(savedRecord) { this.getRecords(); }
	}
	deleteRecord(record: MaintenanceAccount, event: any) {
		//event.stopPropagation();
		
	}
}