import { Injectable } 				from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Role } 							from '../roles/model';
import { Permission } 				from '../permissions/model';
import { Authorization } 	    from '../authorization/model';

import { MODULE }                 from '../shared/constants';

import { AuthorizationService }   from '../authorization/service';
import { RoleService } 				from '../roles/service';
import { PermissionService } 	from '../permissions/service';

@Injectable()
export class RolePermissionService {

  constructor(
    private lservice: RoleService,
    private rservice: PermissionService,
    private authzn: AuthorizationService
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

  getAuthzn(): Authorization {
    return this.authzn.get(MODULE.ROLE_PERMISSION.name);
  }

}
