import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { MaintenanceAccount } from './maint-acct';
import { MaintenanceAccountService } from './maint-acct.service';

var list_css = require('./maint-acct-list.component.css');
var list_css_string = list_css.toString();
var template_html = require('./maint-acct-list.component.html');
var template_string = template_html.toString();

@Component({
	moduleId: module.id,
	selector: 'maint-acct-list',
	template: template_html,
	styles: [list_css_string]
})
export class MaintenanceAccountListComponent implements OnInit {
	records: Observable<MaintenanceAccount[]>;
	//selectedRecord: MaintenanceAccount;
	private selectedId: number;

	addingRecord: boolean = false;
	error: any;

//	constructor(private router: Router){};
	constructor(
		private router: Router, 
		private route: ActivatedRoute,
		private service: MaintenanceAccountService
	) {}

	ngOnInit() {
		this.getRecords();
	}

	getRecords() {
		console.log('maint-acct-list.component >>> getRecords()...');
/*		this.maintenanceAccountService.getRecords().then(records => {
				this.records = records;
		})  */
		this.records = this.route.params
			.switchMap( (params: Params) => {
				this.selectedId = +params['id'];
				return this.service.getRecords();
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
		//this.selectedRecord = record;
		this.router.navigate(['/maint-acct-detail', record.id]);
	}
	gotoDetail() {
		this.router.navigate(['/maint-acct-detail', this.selectedId]);
	}
	addRecord() {
console.log('add maint record...');
		//this.addingRecord = true;
		//this.selectedRecord = null;
		this.router.navigate(['/maint-acct-detail', 0]); // 0 as id for new maint-acct-detail
	}
	close(savedRecord: MaintenanceAccount) {
		this.addingRecord = false;
		if(savedRecord) { this.getRecords(); }
	}
	deleteRecord(record: MaintenanceAccount, event: any) {
		//event.stopPropagation();
		
	}
}