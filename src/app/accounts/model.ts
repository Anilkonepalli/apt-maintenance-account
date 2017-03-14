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
        public remarks: string = '',
        public owner_id: number = undefined
    ) { }

    clone() {
        return new Account(
            this.id,
            this.item,
            this.flat_number,
            this.for_month,
            this.for_year,
            this.name,
            this.crdr,
            this.amount,
            this.balance,
            this.category,
            this.recorded_at,
            this.remarks,
            this.owner_id
        );
    }

}
