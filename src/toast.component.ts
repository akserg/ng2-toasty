// Copyright (C) 2016-2017 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ToastData } from './toasty.service';
import { isFunction } from 'util';

/**
 * A Toast component shows message with title and close button.
 */
@Component({
    selector: 'ng2-toast',
    template: `
        <div class="toast" [ngClass]="[toast.type, toast.theme]" (click)="click($event)">
            <div *ngIf="toast.showClose" class="close-button" (click)="close($event)"></div>
            <div *ngIf="toast.title || toast.msg" class="toast-text">
                <span *ngIf="toast.title" class="toast-title" [innerHTML]="toast.title | safeHtml"></span>
                <br *ngIf="toast.title && toast.msg"/>
                <span *ngIf="toast.msg" class="toast-msg" [innerHtml]="toast.msg | safeHtml"></span>
            </div>
        </div>`
})
export class ToastComponent {

    @Input() toast: ToastData;
    @Output('closeToast') closeToastEvent = new EventEmitter();

    /**
     * Event handler invokes when user clicks on close button.
     * This method emit new event into ToastyContainer to close it.
     */
    close($event: any) {
        $event.preventDefault();
        this.closeToastEvent.next(this.toast);
    }

    /**
     * Event handler invokes when user clicks on Toast button.
     * This method emit new event into ToastyContainer to close it.
     */
    click($event: any) {
        $event.preventDefault();
        if (this.toast.onClick && isFunction(this.toast.onClick)) {
            this.toast.onClick.call(this, this.toast);
        }
    }
}
