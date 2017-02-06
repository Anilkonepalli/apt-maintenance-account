import { Permission } from '../permissions/model';

export class Authorization {

	constructor(
		public permissions: Permission[]
	){}

	permits(action: string): boolean {
		switch(action) {
			case 'add': return this.permitsAdd();
			default: return false;
		};
	}

	permitsAdd(): boolean {
		this.permissions.forEach(permission => {
			let indx = permission.operations.indexOf('C');
console.log('add permission : '); console.log(indx);			
			if(indx >= 0) return true;  // else continue to check other permissions in this iteration
		});
		return false;
	}
}