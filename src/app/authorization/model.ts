import { Permission } from '../permissions/model';

export class Authorization {
	public owner: number = 0; // 0 means no owner

	constructor(
		public permissions: Permission[],
		public user: number
	){}

	public allowsAdd(): boolean {
		let perm = this.permissions.find(eachPerm => {
			return eachPerm.operations.indexOf('C') >= 0; // find first permission that satisfies this condition
		});
		return perm != undefined;
	}

	public allowsView(owner: number): boolean {
		return this.allows('R', owner);
	}

	public allowsEdit(owner: number): boolean {
		return this.allows('U', owner); 
	}

	public allowsDelete(owner: number): boolean {
		return this.allows('D', owner);
	}

	private allows(action: string, owner:number): boolean {

		let permissions = this.permissions.filter(perm => { // find permissions with granted action
			return perm.operations.indexOf(action) >= 0;
		});
		let pCount = permissions.length;
		if(pCount < 1) return false; // no permissions found

		let permissionsWithCondition = permissions.filter(perm => { // find permissions with condition
			return perm.condition != null && perm.condition != '';
		});
		let pwcCount = permissionsWithCondition.length;
		if(pwcCount < 1) return true; // permission(s) exist but has no condition

		if(pCount > pwcCount) return true; // permissions with no condition take precedence, hence return true 

		// evaluate condition in each ofthe permissionsWithCondition
		let fn;
		let data;
		let evaluatedPerms = permissionsWithCondition.filter(perm => { // filter for permission that 
			fn = new Function("data", perm.condition);				   // evaluates its condition to true
			data = { userId: this.user, ownerId: owner };
			return fn(data);
		});
		return evaluatedPerms.length > 0;
	}

}