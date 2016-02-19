import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {ToastyConfig} from './toasty.config';
import {Toast} from './toasty.service';

/**
 * This a toast component shows message with title and close button.
 */
@Component({
    selector: 'ng2-toast',
    directives: [CORE_DIRECTIVES],
    template: `
        <div class="toast" [ngClass]="[toast.type, toast.theme, toast.shake]" (click)="clickToasty($event)">
            <div *ngIf="toast.showClose" class="close-button" (click)="close($event)"></div>
            <div *ngIf="toast.title || toast.msg" class="toast-text">
                <span *ngIf="toast.title" class="toast-title">{{toast.title}}</span>
                <br *ngIf="toast.title && toast.msg" />
                <span *ngIf="toast.msg" class="toast-msg">{{toast.msg}}</span>
            </div>
        </div>`
})
export class ToastyComponent {

    @Input() toast:Toast;
    @Output('closeToast') closeToastEvent = new EventEmitter();
    @Output('clickOnToast') clickOnToastEvent = new EventEmitter();

    /**
     * Event handler invokes when user clicks on close button.
     * This method emit new event to ToastyContainer to close it.
     */
    close($event:any) {
        $event.preventDefaults();
        this.closeToastEvent.emit('closeToast');
    }

    /**
     * Event handler invokes when user clicks on body of ToastyComponent.
     * This method emit new event to ToastyContainer call method onClick and close it if flag clickToClose set true.
     */
    clickToasty($event:any) {
        $event.preventDefaults();
        this.clickOnToastEvent.emit('clickOnToast');
    }
}
