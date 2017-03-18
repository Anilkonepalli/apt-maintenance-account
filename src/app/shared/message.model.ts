export class Message {
    public constructor(
        public title: string = '',
        public text: string = ''
    ) { }

    public isError(): boolean {
        return false;
    }

    public isInfo(): boolean {
        return false;
    }

    public isWarning(): boolean {
        return false;
    }
}
