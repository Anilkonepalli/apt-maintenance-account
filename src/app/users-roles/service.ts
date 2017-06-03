import { Injectable } 	from '@angular/core';

import { Role } 				from '../roles/model';
import { RoleService } 	from '../roles/service';

import { User } 				from '../users/model';
import { UserService } 	from '../users/service';
import { Authorization } 	    from '../authorization/model';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserRoleService {

  constructor(
    private lservice: UserService,
    private rservice: RoleService
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
  getAuthorization(): Promise<Authorization> {
    return this.lservice.getAuthorizationFor('users-roles');
  }

}
