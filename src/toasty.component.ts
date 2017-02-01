// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import { Component, Input, OnInit, TemplateRef, QueryList, ContentChildren, AfterContentInit } from '@angular/core';

import { isFunction } from './toasty.utils';
import { ToastyService, ToastData, ToastyConfig } from './toasty.service';
import { ToastyTemplate } from './shared';

/**
 * Toasty is container for Toast components
 */
@Component({
  selector: 'ng2-toasty',
  template: `
    <div id="toasty" [ngClass]="[position]">
        <ng2-toast *ngFor="let toast of toasts" [toast]="toast" [messageTemplate]="messageTemplate" [titleTemplate]="titleTemplate" (closeToast)="closeToast(toast)"></ng2-toast>
    </div>`
})
export class ToastyComponent implements OnInit, AfterContentInit {
  /**
   * Set of constants defins position of Toasty on the page.
   */
  static POSITIONS: Array<String> = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center', 'center-center'];

  @ContentChildren(ToastyTemplate)
  private toastyTemplates: QueryList<any>;

  public titleTemplate: TemplateRef<any>;
  public messageTemplate: TemplateRef<any>;

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
    this.toastyService.getClear().subscribe((id: number) => {
        if (id) {
            this.clear(id);
        } else {
            // Lets clear all toasts
            this.clearAll();
        }
    });
  }

  /**
   * `ngAfterContentInit` is called after a component's content has been fully initialized.
   * We initialize `title` or `message` templates for the toast
   */
  ngAfterContentInit(): void {
    this.toastyTemplates.forEach((toastyTemplate) => {
      switch(toastyTemplate.getType()) {
        case 'title':
          this.titleTemplate = toastyTemplate.templateRef;
          break;

        case 'message':
          this.messageTemplate = toastyTemplate.templateRef;
          break;

        default:
          this.messageTemplate = toastyTemplate.templateRef;
          break;
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
