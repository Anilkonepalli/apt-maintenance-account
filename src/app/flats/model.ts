export class Flat {

    constructor(
        public id: number = undefined,
        public block_number: string = '',
        public flat_number: string = '',
        public remarks: string = '',
        public owner_id: number = undefined
    ) { }

    clone() {
        return new Flat(
            this.id,
            this.block_number,
            this.flat_number,
            this.remarks,
            this.owner_id
        );
    }

}
