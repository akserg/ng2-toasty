// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ToastData } from './toasty.service';

/**
 * A Toast component shows message with title and close button.
 */
@Component({
  moduleId: module.id,
  selector: 'ng2-toast',
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
