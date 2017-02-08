import { Permission } from '../permissions/model';

export class Authorization {
	public owner: number = 0; // 0 means no owner

	constructor(
		public permissions: Permission[],
		public user: number
	){}

/*	static defaultPermissions = {
		canAdd: false
	};

	getUserPermissions() {
		return {
			canAdd: this.allowsAdd()
		};
	}
*/

	public allowsAdd(): boolean {
		//return this.permissions.find(this.hasAdd) !== undefined;
		let perm = this.permissions.find(eachPerm => {
			return eachPerm.operations.indexOf('C') >= 0; // find first permission that satisfies this condition
		});
		return perm != undefined;
	}

/*	private hasAdd(permission: Permission): boolean {
		return permission.operations.indexOf('C') >= 0;
	}
*/
	public allowsView(owner: number): boolean {

		let permissions = this.permissions.filter(perm => { // find permissions with Read grants
			return perm.operations.indexOf('R') >= 0;
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