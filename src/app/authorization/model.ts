import { Permission } from '../permissions/model';

export class Authorization {
	public owner: number = 0; // 0 means no owner

	constructor(
		public permissions: Permission[],
		public user: number
	){}

	static defaultPermissions = {
		canAdd: false
	};

	getUserPermissions() {
		let user = {
			canAdd: this.allowsAdd()
		};
		return user;
	}

	private allowsAdd(): boolean {
		return this.permissions.find(this.hasAdd) !== undefined;
	}

	private hasAdd(permission: Permission): boolean {
		return permission.operations.indexOf('C') >= 0;
	}

}