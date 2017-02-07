export class Permission {

	constructor(
		public id: number = undefined,
		public operations: string = '',
		public resource: string = '',
		public condition: string = null,
		public description: string = null
	){}

}