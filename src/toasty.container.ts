// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { isFunction } from '@angular/common/src/facade/lang';
import {ToastyConfig} from './toasty.config';
import {ToastyService, ToastData} from './toasty.service';
import {Toast} from './toasty.component';

/**
 * Toasty is container for Toast components
 */
@Component({
  selector: 'ng2-toasty',
  encapsulation: ViewEncapsulation.None,
  directives: [CORE_DIRECTIVES, Toast],
  template: `
    <div id="toasty" [ngClass]="[position]">
        <ng2-toast *ngFor="let toast of toasts" [toast]="toast" (closeToast)="closeToast(toast)"></ng2-toast>
    </div>`
})
export class Toasty implements OnInit {
  /**
   * Set of constants defins position of Toasty on the page.
   */
  static POSITIONS: Array<String> = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center'];
  // The window position where the toast pops up. Possible values:
  // - bottom-right (default value from ToastConfig)
  // - bottom-left
  // - top-right
  // - top-left
  // - top-center
  // - bottom-center
  @Input() position: string;

  // The storage for toasts.
  toasts: Array<ToastData> = [];

  constructor(private config: ToastyConfig, private toastyService: ToastyService) { }

  /**
   * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
   * first time, and before any of its children have been checked. It is invoked only once when the
   * directive is instantiated.
   */
  ngOnInit(): any {
    // We listen our service to recieve new toasts from it
    this.toastyService.getToasts().subscribe((toast: ToastData) => {
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
    // We listen clear all comes from service here.
    this.toastyService.getClear().subscribe(() => {
      // Lets clear all toasts
      this.clearAll();
    });
    if (this.position) {
      let notFound = true;
      for (let i = 0; i < Toasty.POSITIONS.length; i++) {
        if (Toasty.POSITIONS[i] === this.position) {
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
  closeToast(toast: ToastData) {
    this.clear(toast.id);
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
