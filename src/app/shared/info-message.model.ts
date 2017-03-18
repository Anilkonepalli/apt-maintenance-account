import { Message } from './message.model';

export class InfoMessage extends Message {
    public constructor(
        public title: string = '',
        public text: string = ''
    ) {
        super(title, text);
    }

    public isInfo(): boolean {
        return true;
    }

}
