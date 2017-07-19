export class Resident {

  constructor(
    public id: number = undefined,
    public first_name: string = '',
    public last_name: string = '',
    public is_a: string = '',
    public occupied_on: string = '',
    public vacated_on: string = '',
    public remarks: string = '',
    public owner_id: string = ''
  ) { }

  public clone() {
    return new Resident(
      this.id,
      this.first_name,
      this.last_name,
      this.is_a,
      this.occupied_on,
      this.vacated_on,
      this.remarks,
      this.owner_id
    );
  }

}
