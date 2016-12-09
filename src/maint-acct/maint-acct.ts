export class MaintenanceAccount {

/*	id: number;
	item: string;
	flat_number: string;
	for_month: number;
	for_year: number; 
	name: string;
	crdr: string;
	amount: number;
	balance: number;
	category: string;
	recorded_at: string;
	remarks: string;

	created_at: string;
	updated_at: string;
	deleted_at: string;
*/

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

