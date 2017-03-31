import { Component, Input } from '@angular/core';
import { Message }          from './message.model';

@Component({
    selector: 'message',
    template: `
    <div class="alert alert-danger" *ngIf="message.isError()">{{message.text}}</div>
    <div class="alert alert-warning" *ngIf="message.isWarning()">{{message.text}}</div>
    <div class="alert alert-info" *ngIf="message.isInfo()">{{message.text}}</div>
  `
})
export class MessageComponent {
    @Input() message: Message = new Message();
}
