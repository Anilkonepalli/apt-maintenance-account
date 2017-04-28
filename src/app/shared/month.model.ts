
export class Month {

  public constructor(
    public number: number = 0,
    public shortName: string = '',
    public longName: string = ''
  ) { }

  public static all(): Month[] {
    return [
      new Month(1, 'Jan', 'January'),
      new Month(2, 'Feb', 'February'),
      new Month(3, 'Mar', 'March'),
      new Month(4, 'Apr', 'April'),
      new Month(5, 'May', 'May'),
      new Month(6, 'Jun', 'June'),
      new Month(7, 'Jul', 'July'),
      new Month(8, 'Aug', 'August'),
      new Month(9, 'Sep', 'September'),
      new Month(10, 'Oct', 'October'),
      new Month(11, 'Nov', 'November'),
      new Month(12, 'Dec', 'December')
    ];
  }

}
