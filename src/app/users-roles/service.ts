import { Injectable } 	              from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Role } 				              from '../roles/model';
import { User } 				              from '../users/model';
import { Authorization } 	            from '../authorization/model';

import { MODULE }                     from '../shared/constants';

import { RoleService } 	              from '../roles/service';
import { UserService } 	              from '../users/service';
import { AuthorizationService }       from '../authorization/service';

@Injectable()
export class UserRoleService {

  constructor(
    private lservice: UserService,
    private rservice: RoleService,
    private authzn: AuthorizationService
  ) { }

  getlmodels(): Promise<User[]> {
    return this.lservice.getList();
  }

  getrmodels(): Promise<Role[]> {
    return this.rservice.getList();
  }

  getAttachedModels(id: number): Promise<Role[]> { // get attached models for the selected item on left side
    return this.lservice.getRolesFor(id);
  }

  saveAttachedModels(lId: number, ids: number[]): Promise<number> {
    return this.lservice.updateRolesFor(lId, ids);
  }

  getAuthzn(): Authorization {
    return this.authzn.get(MODULE.ACCOUNT.name);
  }

}
