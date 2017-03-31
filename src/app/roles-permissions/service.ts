import { Injectable } 				from '@angular/core';

import { Role } 							from '../roles/model';
import { RoleService } 				from '../roles/service';

import { Permission } 				from '../permissions/model';
import { PermissionService } 	from '../permissions/service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RolePermissionService {

    constructor(
        private lservice: RoleService,
        private rservice: PermissionService
    ) { }

    getlmodels(): Promise<Role[]> {
        return this.lservice.getList();
    }

    getrmodels(): Promise<Permission[]> {
        return this.rservice.getList();
    }

    getAttachedModels(id: number): Promise<Permission[]> { // get attached models for the selected item on left side
        return this.lservice.getMyPermissions(id);
    }

    saveAttachedModels(lId: number, ids: number[]): Promise<number> {
        return this.lservice.updateMyPermissions(lId, ids);
    }
}
