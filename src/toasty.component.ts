// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ToastData} from './toasty.service';

/**
 * A Toast component shows message with title and close button.
 */
@Component({
  selector: 'ng2-toast',
  directives: [CORE_DIRECTIVES],
  template: `
        <div class="toast" [ngClass]="[toast.type, toast.theme]">
            <div *ngIf="toast.showClose" class="close-button" (click)="close($event)"></div>
            <div *ngIf="toast.title || toast.msg" class="toast-text">
                <span *ngIf="toast.title" class="toast-title">{{toast.title}}</span>
                <br *ngIf="toast.title && toast.msg" />
                <span *ngIf="toast.msg" class="toast-msg">{{toast.msg}}</span>
            </div>
        </div>`
})
export class Toast {

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
