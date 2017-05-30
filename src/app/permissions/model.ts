export class Permission {

  constructor(
    public id: number = undefined,
    public operations: string = '',
    public resource: string = '',
    public condition: string = '',
    public description: string = '',
    public owner_id: number = undefined
  ) { }

}
