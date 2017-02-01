import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Role } from '../roles/model';
import { RoleService } from '../roles/service';

import { Permission } from '../permissions/model';
import { PermissionService } from '../permissions/service';



@Injectable()
export class RolePermissionService {

	constructor(
		private lservice: RoleService,
		private rservice: PermissionService
	) {}

	getlmodels(): Promise<Role[]> {
		return this.lservice.getList();
	}

	getrmodels(): Promise<Permission[]> {
		return this.rservice.getList();
	}

	getAttachedModels(id: number): Promise<Permission[]> { // get attached models for the selected item on left side
		return this.lservice.getMyPermissions(id);
	}

}