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

		let permissions = this.permissions.filter(perm => { // find permissions with Read grants
			return perm.operations.indexOf(action) >= 0;
		});

		if(permissions.length < 1) return false; // no permissions found

		permissions = permissions.filter(perm => { // find permissions with condition
			return perm.condition != null && perm.condition != '';
		});

		if(permissions.length < 1) return true; // permission(s) exist but has no condition

		// evaluate condition
		let fn = new Function("data", permissions[0].condition);
		let data = { userId: this.user, ownerId: owner };

		return fn(data);
	}

}