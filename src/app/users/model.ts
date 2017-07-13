export class User {
  constructor(
    public id: number = 0,
    public name: string = '',
    public first_name: string = '',
    public last_name: string = '',
    public email: string = '',
    public password: string = '',
    public social_network_id: string = '',
    public infos: Array<any> = []
  ) { }

};

export var SampleUser1 = {
  id: 0,
  name: 'test',
  first_name: 'test',
  last_name: 'user',
  email: 'test@eastgate.in',
  password: 'test12345'
}
