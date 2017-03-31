import { Message } from './message.model';

export class WarningMessage extends Message {

    public constructor(
        public title: string = '',
        public text: string = ''
    ) {
        super(title, text);
    }

    public isWarning(): boolean {
        return true;
    }

}
