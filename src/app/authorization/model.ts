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
      // find first permission that satisfies this condition
      return eachPerm.operations.indexOf('C') >= 0;
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

    let permissions = this.permissions.filter(perm => {
      // find permissions with granted 'action'
      return perm.operations.indexOf(action) >= 0;
    });
    let pCount = permissions.length;
    if (pCount < 1) return false; // no permissions found

    let permissionsWithCondition = permissions.filter(perm => {
      // find permissions with condition
      return perm.condition != null && perm.condition != '';
    });
    let pwcCount = permissionsWithCondition.length;
    // if permission(s) exist but has no condition(s) with it, just return true
    if (pwcCount < 1) return true;

    // permissions with no condition take higher precedence, hence return true
    if (pCount > pwcCount) return true;

    // evaluate condition in each of the permissionsWithCondition
    let evaluatedPerms = permissionsWithCondition.filter(perm => {
      let data = {
        user_id: this.user,
        model: { owner_id: owner }
      };
      let utility = new Utility(perm.condition, data);
      return utility.evaluate(); // returns boolean value
    });

    let result = evaluatedPerms.length > 0;
    this.logger.info('Evaluated to: ' + result);
    return result;
  }

}

class Parser {
  static getFunction(condition) {
    return new Function("data", condition);
  }
}

class Utility {
  public dynamicFunction: Function;

  constructor(
    public condition: string,
    public data: any
  ) {
    this.dynamicFunction = Parser.getFunction(condition);
  }

  evaluate() {
    console.log('inside evalute(data)...');
    return this.dynamicFunction();
  }

  userOwnAccounts() {
    console.log('inside accountsOf()...');
    return true; // just return true, as it is taken care at server side
  }

  userOwnRecord() {
    return this.data.user_id === this.data.model.owner_id;
  }

  // return data.user_id === data.model.owner_id  <------ Don't delete it for a while


}
