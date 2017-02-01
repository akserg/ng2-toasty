// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ToastData } from './toasty.service';

/**
 * A Toast component shows message with title and close button.
 */
@Component({
  selector: 'ng2-toast',
  template: `
        <div class="toast" [ngClass]="[toast.type, toast.theme]">
            <div *ngIf="toast.showClose" class="close-button" (click)="close($event)"></div>
            <div *ngIf="toast.title || toast.msg" class="toast-text">
                <span *ngIf="toast.title" class="toast-title">
                    <span *ngIf="!titleTemplate">{{toast.title}}</span>
                    <template *ngIf="titleTemplate" [toastyTemplateWrapper]="titleTemplate" [context]="toast"></template>
                </span>
                <br *ngIf="toast.title && toast.msg" />
                <span *ngIf="toast.msg" class="toast-msg">
                    <span *ngIf="!messageTemplate">{{toast.msg}}</span>
                    <template *ngIf="messageTemplate" [toastyTemplateWrapper]="messageTemplate" [context]="toast"></template>
                </span>
            </div>
        </div>`
})
export class ToastComponent {

  @Input() toast: ToastData;
  @Output('closeToast') closeToastEvent = new EventEmitter();
  @Input() titleTemplate: TemplateRef<any>;
  @Input() messageTemplate: TemplateRef<any>;

  /**
   * Event handler invokes when user clicks on close button.
   * This method emit new event into ToastyContainer to close it.
   */
  close($event: any) {
    $event.preventDefault();
    this.closeToastEvent.next(this.toast);
  }
}
