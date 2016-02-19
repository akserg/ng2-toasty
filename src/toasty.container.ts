import {Component, ViewEncapsulation, Input, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {isFunction} from 'angular2/src/facade/lang';

import {Observable} from 'rxjs/Observable';

import {ToastyConfig} from './toasty.config';
import {ToastyService, Toast} from './toasty.service';
import {ToastyComponent} from './toasty.component';

/**
 * This container for toasts.
 */
@Component({
    selector: 'ng2-toasty',
    encapsulation: ViewEncapsulation.None,
    directives: [CORE_DIRECTIVES, ToastyComponent],
    template: `
    <div id="toasty" [ngClass]="[position]">
        <ng2-toast *ngFor="#toast of toasts" [toast]="toast" (closeToast)="closeToast(toast)" (clickOnToast)="clickOnToast(toast)"></ng2-toast>
    </div>`
})
export class ToastyContainer implements OnInit {

    // The window position where the toast pops upk. Possible values:
    // - bottom-right (default valie from ToastConfig)
    // - bottom-left
    // - top-right
    // - top-left
    // - top-center
    // - bottom-center
    @Input() position: string;

    // The storage for toasts.
    toasts: Array<Toast> = [];

    static POSITIONS:Array<String> = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center'];

    constructor(private config:ToastyConfig, private toastyService:ToastyService) {}

    ngOnInit(): any {
        // We listen our service to recieve new toasts from it
        this.toastyService.getToasts().subscribe((toast:Toast) => {
            // If we've gone over our limit, remove the earliest
            // one from the array
            if (this.toasts.length >= this.config.limit) {
                this.toasts.shift();
            }
            // Add toasty to array
            this.toasts.push(toast);
            //
            // If there's a timeout individually or globally,
            // set the toast to timeout
            if (toast.timeout) {
                this._setTimeout(toast);
            }
        });
        if (this.position) {
            let notFound:boolean = true;
            for (var i = 0; i < ToastyContainer.POSITIONS.length; i++) {
                if (ToastyContainer.POSITIONS[i] === this.position) {
                    notFound = false;
                    break;
                }
            }
            if (notFound) {
                // Position was wrong - clear it here to use the one from config.
                this.position = this.config.position;
            }
        } else {
            this.position = this.config.position;
        }
        this.position = 'toasty-position-' + this.position;
    }

    /**
     * Event listener of 'closeToast' event comes from ToastyComponent.
     * This method removes ToastComponent assosiated with this Toast.
     */
    closeToast(toast:Toast) {
        this.clear(toast.id);
    }

    /**
     * Event listener of 'clickOnToast'event comes from ToastyComponent.
     * This method invokes onClick method of Toast.
     * It can removes ToastComponent assosiated with this Toast if clickToClose of Toast was set.
     */
    clickOnToast(toast:Toast) {
        //scope.$broadcast('toasty-clicked', toast);
        if (toast.onClick && isFunction(toast.onClick))
            toast.onClick.call(this, toast);
        if (toast.clickToClose)
            this.clear(toast.id);
    }

    // Clear indivudally toast
    clear(id:number) {
        if (id) {
            this.toasts.forEach((value: any, key: number) => {
                if (value.id === id) {
                    //scope.$broadcast('toasty-cleared', scope.toasty[key]);
                    if (value.onRemove && isFunction(value.onRemove))
                        value.onRemove.call(this, value);
                    this.toasts.splice(key, 1);
                }
            });
        } else {
            throw new Error('Please provide id of Toast to close');
        }
    }

    // Clear all toasts
    clearAll(id:number) {
        this.toasts.forEach((value: any, key: number) => {
            if (value.onRemove && isFunction(value.onRemove))
                value.onRemove.call(this, value);
        });
        this.toasts = [];
    }

    // Custom setTimeout function for specific
    // setTimeouts on individual toasts
    private _setTimeout(toast:Toast) {
        window.setTimeout(() => {
            console.log('clear', toast.id);
            this.clear(toast.id);
        }, toast.timeout);
    }
}
