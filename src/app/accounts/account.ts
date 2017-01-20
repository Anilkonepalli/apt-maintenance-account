export class Account {

	constructor(
		public id: number = undefined,
		public item: string = '',
		public flat_number: string = '',
		public for_month: number = 0,
		public for_year: number = 0,
		public name: string = '',
		public crdr: string = '',
		public amount: number = 0.0,
		public balance: number = 0.0,
		public category: string = '',
		public recorded_at: string = '',
		public remarks: string = ''
		//public created_at: string = '',
		//public updated_at: string = '',
		//public deleted_at: string = '' 
	){}

}