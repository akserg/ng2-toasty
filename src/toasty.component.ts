import {Component, Input, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {ToastyConfig} from './toasty.config';
import {Toast} from './toasty.service';

/**
 * This a toast component.
 */
@Component({
    selector: 'ng2-toast',
    directives: [CORE_DIRECTIVES],
    template: `
        <div class="toast" [ngClass]="setClasses()" (click)="clickToasty($event)">
            <div (click)="close($event)" class="close-button" *ngIf="toast.showClose"></div>
            <div *ngIf="toast.title || toast.msg" class="toast-text">
            <span class="toast-title" *ngIf="!toast.html && toast.title" [innerHtml]="toast.title"></span>
            <span class="toast-title" *ngIf="toast.html && toast.title" [innerHtml]="toast.title"></span>
            <br *ngIf="toast.title && toast.msg" />
            <span class="toast-msg" *ngIf="!toast.html && toast.msg" [innerHtml]="toast.msg"></span>
            <span class="toast-msg" *ngIf="toast.html && toast.msg" [innerHtml]="toast.msg"></span>
        </div>`
})
export class ToastyComponent implements OnInit {

    @Input() toast:Toast;

    constructor() {}

    ngOnInit(): any {
        console.log('toast', this.toast);
    }

    setClasses() {
        return {
            type:this.toast.type,
            interact:this.toast.interact,
            shake:this.toast.shake,
            theme:this.toast.theme
        };
    }

    /**
     * On ng-click="close", remove the specific toast
     */
    close($event:any) {

    }

    /**
     * On ng-click="close", remove the specific toast
     */
    clickToasty($event:any) {

    }
}
