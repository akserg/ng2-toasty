// Copyright (C) 2016-2017 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import { Component, Input, Output, EventEmitter, trigger, state, style, transition, animate } from '@angular/core';

import { ToastData } from './toasty.service';

/**
 * A Toast component shows message with title and close button.
 */
@Component({
    selector: 'ng2-toast',
    animations: [
        trigger('enterLeave', [

            // Enter from right
            state('fromRight', style({opacity: 1, transform: 'translateX(0)'})),
            transition('* => fromRight', [
                style({opacity: 0, transform: 'translateX(5%)'}),
                animate('400ms ease-in-out')
            ]),
            state('fromRightOut', style({opacity: 0, transform: 'translateX(-5%)'})),
            transition('fromRight => fromRightOut', [
                style({opacity: 1, transform: 'translateX(0)'}),
                animate('300ms ease-in-out')
            ]),

            // Enter from left
            state('fromLeft', style({opacity: 1, transform: 'translateX(0)'})),
            transition('* => fromLeft', [
                style({opacity: 0, transform: 'translateX(-5%)'}),
                animate('400ms ease-in-out')
            ]),
            state('fromLeftOut', style({opacity: 0, transform: 'translateX(5%)'})),
            transition('fromLeft => fromLeftOut', [
                style({opacity: 1, transform: 'translateX(0)'}),
                animate('300ms ease-in-out')
            ]),

            // Rotate
            state('scale', style({opacity: 1, transform: 'scale(1)'})),
            transition('* => scale', [
                style({opacity: 0, transform: 'scale(0)'}),
                animate('400ms ease-in-out')
            ]),
            state('scaleOut', style({opacity: 0, transform: 'scale(0)'})),
            transition('scale => scaleOut', [
                style({opacity: 1, transform: 'scale(1)'}),
                animate('400ms ease-in-out')
            ]),

            // Scale
            state('rotate', style({opacity: 1, transform: 'rotate(0deg)'})),
            transition('* => rotate', [
                style({opacity: 0, transform: 'rotate(5deg)'}),
                animate('400ms ease-in-out')
            ]),
            state('rotateOut', style({opacity: 0, transform: 'rotate(-5deg)'})),
            transition('rotate => rotateOut', [
                style({opacity: 1, transform: 'rotate(0deg)'}),
                animate('400ms ease-in-out')
            ])
        ])
    ],
    template: `
        <div class="toast" [ngClass]="[toast.type, toast.theme]" [@enterLeave]="toast.animate">
            <div *ngIf="toast.showClose" class="close-button" (click)="close($event)"></div>
            <div *ngIf="toast.title || toast.msg" class="toast-text">
                <span *ngIf="toast.title" class="toast-title" [innerHTML]="toast.title | safeHtml"></span>
                <br *ngIf="toast.title && toast.msg" />
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
}
