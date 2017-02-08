export class User {
	constructor (
		public id: number = 0,
		public userName: string = '',
		public firstName: string = '',
		public lastName: string = '',
		public email: string = '',
		public password: string = ''
	){}
}