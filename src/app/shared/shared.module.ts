import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { HighlightDirective } from './highlight.directive';
import { TitleCasePipe }      from './title-case.pipe';

import { MessageComponent } from './message.component';

@NgModule({
    imports: [CommonModule],
    exports: [CommonModule, FormsModule,
        HighlightDirective, TitleCasePipe, MessageComponent],
    declarations: [HighlightDirective, TitleCasePipe, MessageComponent]
})
export class SharedModule { }
