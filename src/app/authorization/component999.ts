import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs/Observable';

//import 'rxjs/add/observable/of';
//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/delay';

import { Http, Headers, Response } from '@angular/http';

import { Authorization } from './model';
import { Permission } from '../permissions/model';
import { UserService } from '../users/service';

interface ModuleMap {
	[key: string]: Authorization;
}

@Component({
	selector: 'authorization',
	template: ''
})
export class AuthorizationComponent implements OnInit {
	
	allMyPermissions: Permission[]; // allMyPermissions mean all permissions of logged user

	auths: ModuleMap;

//	public config: any = { server_ip_addr: "http://localhost:3002"};

//	private url = this.config.server_ip_addr+'/api/users/mypermissions';
//	private id_token = localStorage.getItem('id_token');
//	private headers = new Headers({
//		'Content-Type': 'application/json',
//		'x-access-token': this.id_token
//	});

	constructor(private http: Http, private userService: UserService) {}

	ngOnInit() {
console.log('Initializing Authorization Service...');

		this.userService.getMyPermissions()
			.then(models => {
				this.allMyPermissions = models;
console.log('All my permissions...'); console.log(models);
				this.mapAuthsToModule();
			});
	}

	public getFor(moduleName: string): Authorization {
console.log(' Get Authorization for '+moduleName);	
console.log(this.auths);	
		return this.auths[moduleName];
	}

	private mapAuthsToModule(): null {
		let moduleNames = this.resources();
console.log('Module Names: '); console.log(moduleNames);		
		moduleNames.forEach(modName => {
			let perms = this.allMyPermissions
								.filter(perm => perm.resource === modName);
			let auth = new Authorization(perms);
			this.auths[modName] = auth;
		});
console.log('Permissions Map...'); console.log(this.auths);		
		return null;
	}

	private resources(): string[] {
console.log('get resources...');
		let uniqueNames = new Set();
		this.allMyPermissions.forEach(perm => uniqueNames.add(perm.resource));
console.log(uniqueNames);		
		return Array.from(uniqueNames);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}
