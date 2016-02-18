import {Component, ViewEncapsulation, Input, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {isFunction} from 'angular2/src/facade/lang';

import {Observable} from 'rxjs/Observable';

import {ToastyConfig} from './toasty.config';
import {ToastyService, Toast} from './toasty.service';
import {ToastyComponent} from './toasty.component';

@Component({
    selector: 'ng2-toasty',
    encapsulation: ViewEncapsulation.None,
    directives: [CORE_DIRECTIVES, ToastyComponent],
    template: `
    <div id="toasty" ng-class="[position]">
        <ng2-toast *ngFor="#toast of toasts" [toast]="toast"></ng2-toast>
    </div>`
})
export class ToastyContainer implements OnInit {

    // Init the position
    @Input() position: string = '';

    // Init the toasty store
    toasts: Array<Toast> = [];

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
                this.setTimeout(toast);
            }
        });
    }

    /**
     * On ng-click="close", remove the specific toast
     */
    close($event:any, id:number) {
        $event.preventDefaults();
        this.clear(id);
    }

    // On ng-click="close", remove the specific toast
    clickToasty(toast:Toast) {
        //scope.$broadcast('toasty-clicked', toast);
        if (toast.onClick && isFunction(toast.onClick))
            toast.onClick.call(toast);
        if (toast.clickToClose)
            this.clear(toast.id);
    }

    // Clear all, or indivudally toast
    clear(id:number) {
        if (!id) {
            this.toasts.forEach((value: any, key: number) => {
                if (value.onRemove && isFunction(value.onRemove))
                    value.onRemove.call(this.toasts[key]);
            });
            this.toasts = [];
            //scope.$broadcast('toasty-cleared');
        } else {
            this.toasts.forEach((value: any, key: number) => {
                if (value.id === id) {
                    //scope.$broadcast('toasty-cleared', scope.toasty[key]);
                    if (value.onRemove && isFunction(value.onRemove))
                        value.onRemove.call(this.toasts[key]);
                    this.toasts.splice(key, 1);
                    // if(!scope.$$phase)
                    //     scope.$digest();
                }
            });
        }
    }

    // Custom setTimeout function for specific
    // setTimeouts on individual toasts
    setTimeout(toast:Toast) {
        window.setTimeout(() => {
            this.clear(toast.id);
        }, toast.timeout);
    }
}
