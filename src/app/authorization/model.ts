import { Permission }        from '../permissions/model';

import { ILogger }	         from '../logger/default-log.service';
import { ConsoleLogService } from '../logger/log.service';

export class Authorization {
  public owner: number = 0; // 0 means no owner
  public logger: ILogger = new ConsoleLogService();

  constructor(
    public permissions: Permission[],
    public user: number
  ) { }

  public allowsAdd(): boolean {
    let perm = this.permissions.find(eachPerm => {
      return eachPerm.operations.indexOf('C') >= 0; // find first permission that satisfies this condition
    });
    return perm != undefined;
  }

  public allowsView(owner: number = -1): boolean {
    return this.allows('R', owner);
  }

  public allowsEdit(owner: number = -1): boolean {
    return this.allows('U', owner);
  }

  public allowsDelete(owner: number = -1): boolean {
    return this.allows('D', owner);
  }

  public allowsAny(owner: number = -1): boolean {
    return this.allowsAdd() ||
      this.allowsView(owner) ||
      this.allowsEdit(owner) ||
      this.allowsDelete(owner);
  }

  public allowsCRUD(owner: number = -1): boolean {
    return this.allowsAdd() &&
      this.allowsView(owner) &&
      this.allowsEdit(owner) &&
      this.allowsDelete(owner);
  }

  private allows(action: string, owner: number): boolean {

    let permissions = this.permissions.filter(perm => { // find permissions with granted 'action'
      return perm.operations.indexOf(action) >= 0;
    });
    let pCount = permissions.length;
    if (pCount < 1) return false; // no permissions found

    let permissionsWithCondition = permissions.filter(perm => { // find permissions with condition
      return perm.condition != null && perm.condition != '';
    });
    let pwcCount = permissionsWithCondition.length;
    if (pwcCount < 1) return true; // permission(s) exist but ha(s|ve) no condition(s) with it

    if (pCount > pwcCount) return true; // permissions with no condition take higher precedence, hence return true

    // evaluate condition in each of the permissionsWithCondition
    let fn;
    let data;
    let evaluatedPerms = permissionsWithCondition.filter(perm => { // filter for permission that
      fn = new Function("data", perm.condition);				   // evaluates its condition to true
      data = {
        user_id: this.user,
        model: { owner_id: owner }
      };
      this.logger.info('evaluate condition data...'); this.logger.info('User ID: ' + this.user + ', owner_id: ' + owner);
      return fn(data);
    });
    return evaluatedPerms.length > 0;
  }

}
