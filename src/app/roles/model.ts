export class Role {

  constructor(
    public id: number = undefined,
    public name: string = '',
    public description: string = '',
    public inherits: string = ''
  ) { }

}
