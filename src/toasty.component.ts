// Copyright (C) 2016-2017 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import { Component, Input, OnInit } from '@angular/core';

import { isFunction } from './toasty.utils';
import { ToastyService, ToastData, ToastyConfig, ToastyEvent, ToastyEventType } from './toasty.service';

/**
 * Toasty is container for Toast components
 */
@Component({
  selector: 'ng2-toasty',
  template: `
    <div id="toasty" [ngClass]="[position]">
        <ng2-toast *ngFor="let toast of toasts" [toast]="toast" (closeToast)="closeToast(toast)"></ng2-toast>
    </div>`
})
export class ToastyComponent implements OnInit {
  /**
   * Set of constants defins position of Toasty on the page.
   */
  static POSITIONS: Array<String> = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center', 'center-center'];

  private _position: string = '';
  // The window position where the toast pops up. Possible values:
  // - bottom-right (default value from ToastConfig)
  // - bottom-left
  // - top-right
  // - top-left
  // - top-center
  // - bottom-center
  // - center-center
  @Input() set position(value: string) {
    if (value) {
      let notFound = true;
      for (let i = 0; i < ToastyComponent.POSITIONS.length; i++) {
        if (ToastyComponent.POSITIONS[i] === value) {
          notFound = false;
          break;
        }
      }
      if (notFound) {
        // Position was wrong - clear it here to use the one from config.
        value = this.config.position;
      }
    } else {
      value = this.config.position;
    }
    this._position = 'toasty-position-' + value;
  }

  get position(): string {
    return this._position;
  }

  // The storage for toasts.
  toasts: Array<ToastData> = [];

  constructor(private config: ToastyConfig, private toastyService: ToastyService) {
    // Initialise position
    this.position = '';
  }

  /**
   * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
   * first time, and before any of its children have been checked. It is invoked only once when the
   * directive is instantiated.
   */
  ngOnInit(): any {
    // We listen events from our service
    this.toastyService.events.subscribe((event: ToastyEvent) => {
      if (event.type === ToastyEventType.ADD) {
        // Add the new one
        let toast: ToastData = event.value;
        this.add(toast);
      } else if (event.type === ToastyEventType.CLEAR) {
        // Clear the one by number
        let id: number = event.value;
        this.clear(id);
      } else if (event.type === ToastyEventType.CLEAR_ALL) {
        // Lets clear all toasts
        this.clearAll();
      }
    });
  }

  /**
   * Event listener of 'closeToast' event comes from ToastyComponent.
   * This method removes ToastComponent assosiated with this Toast.
   */
  closeToast(toast: ToastData) {
    this.clear(toast.id);
  }

  /**
   * Add new Toast
   */
  add(toast: ToastData) {
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
  }

  /**
   * Clear individual toast by id
   * @param id is unique identifier of Toast
   */
  clear(id: number) {
    if (id) {
      this.toasts.forEach((value: any, key: number) => {
        if (value.id === id) {
          if (value.onRemove && isFunction(value.onRemove)) {
            value.onRemove.call(this, value);
          }
          this.toasts.splice(key, 1);
        }
      });
    } else {
      throw new Error('Please provide id of Toast to close');
    }
  }

  /**
   * Clear all toasts
   */
  clearAll() {
    this.toasts.forEach((value: any, key: number) => {
      if (value.onRemove && isFunction(value.onRemove)) {
        value.onRemove.call(this, value);
      }
    });
    this.toasts = [];
  }

  /**
   * Custom setTimeout function for specific setTimeouts on individual toasts.
   */
  private _setTimeout(toast: ToastData) {
    window.setTimeout(() => {
      this.clear(toast.id);
    }, toast.timeout);
  }
}
