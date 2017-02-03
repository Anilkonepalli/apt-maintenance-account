import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Role } from '../roles/model';
import { RoleService } from '../roles/service';

import { User } from '../users/model';
import { UserService } from '../users/service';



@Injectable()
export class UserRoleService {

	constructor(
		private lservice: UserService,
		private rservice: RoleService
	) {}

	getlmodels(): Promise<User[]> {
		return this.lservice.getList();
	}

	getrmodels(): Promise<Role[]> {
		return this.rservice.getList();
	}

	getAttachedModels(id: number): Promise<Role[]> { // get attached models for the selected item on left side
		return this.lservice.getMyRoles(id);
	}
	saveAttachedModels(lId: number, ids: number[]): Promise<number> {
		return this.lservice.updateMyRoles(lId, ids);
	}
}