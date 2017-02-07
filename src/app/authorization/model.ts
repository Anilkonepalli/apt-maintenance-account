import { Permission } from '../permissions/model';

export class Authorization {

	constructor(
		public permissions: Permission[] = []
	){}

	static defaultPermissions = {
		canAdd: false,
		canView: false,
		canUpdate: false,
		canDelete: false
	};

	getUserPermissions() {
		let user = {
			canAdd: this.allowsAdd(),
			canView: this.allowsView(),
			canUpdate: this.allowsUpdate(),
			canDelete: this.allowsDelete()
		};
		return user;
	}

	private allowsAdd(): boolean {
		return this.permissions.find(this.hasAdd) !== undefined;
	}
	private allowsView(): boolean {
		return this.permissions.find(this.hasView) !== undefined;
	}
	private allowsUpdate(): boolean {
		return this.permissions.find(this.hasUpdate) !== undefined;
	}
	private allowsDelete(): boolean {
		return this.permissions.find(this.hasDelete) !== undefined;
	}	

	private hasAdd(permission: Permission): boolean {
		return permission.operations.indexOf('C') >= 0;
	}
	private hasView(permission: Permission): boolean {
		return permission.operations.indexOf('R') >= 0;
	}
	private hasUpdate(permission: Permission): boolean {
		return permission.operations.indexOf('U') >= 0;
	}
	private hasDelete(permission: Permission): boolean {
		return permission.operations.indexOf('D') >= 0;
	}			

}