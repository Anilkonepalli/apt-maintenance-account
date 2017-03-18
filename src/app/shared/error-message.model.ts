import { Message } from './message.model';

export class ErrorMessage extends Message {
    public constructor(
        public title: string = '',
        public text: string = ''
    ) {
        super(title, text);
    }

    public isError(): boolean {
        return true;
    }
}
