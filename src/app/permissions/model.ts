export class Permission {

	constructor(
		public id: number = undefined,
		public operations: string = '',
		public resource: string = '',
		public condition: string = null,
		public description: string = null
	){}

	allowsAdd():boolean { 
		return (this.operations.indexOf('C') >= 0);
	}
	allowsView():boolean { 
		return (this.operations.indexOf('R') >= 0);
	}
	allowsUpdate():boolean { 
		return (this.operations.indexOf('U') >= 0);
	}
	allowsDelete():boolean { 
		return (this.operations.indexOf('D') >= 0);
	}

}