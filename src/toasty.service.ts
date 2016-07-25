// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import {Injectable} from '@angular/core';
import {isString, isNumber, isFunction} from '@angular/common/src/facade/lang';

import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {ToastyConfig} from './toasty.config';

/**
 * Options to configure specific Toast
 */
export interface ToastOptions {
  title: string;
  msg?: string;
  showClose?: boolean;
  theme?: string;
  timeout?: number;
  onAdd?: Function;
  onRemove?: Function;
}

/**
 * Structrure of Toast
 */
export interface ToastData {
  id: number;
  title: string;
  msg: string;
  showClose: boolean;
  type: string;
  theme: string;
  timeout: number;
  onAdd: Function;
  onRemove: Function;
  onClick: Function;
}

/**
 * Toasty service helps create different kinds of Toasts
 */
@Injectable()
export class ToastyService {
  // Allowed THEMES
  static THEMES: Array<string> = ['default', 'material', 'bootstrap'];
  // Init the counter
  uniqueCounter: number = 0;
  private toastsObservable: Observable<ToastData>;
  private toastsSubscriber: Subscriber<ToastData>;

  private clearObservable: Observable<void>;
  private clearSubscriber: Subscriber<void>;

  constructor(private config: ToastyConfig) {
    this.toastsObservable = new Observable<ToastData>((subscriber: Subscriber<ToastData>) => {
      this.toastsSubscriber = subscriber;
    });
    this.clearObservable = new Observable<void>((subscriber: Subscriber<void>) => {
      this.clearSubscriber = subscriber;
    });
  }

  /**
   * Get list of toats
   */
  getToasts(): Observable<ToastData> {
    return this.toastsObservable;
  }

  getClear(): Observable<void> {
    return this.clearObservable;
  }

  /**
   * Create Toast of a default type
   */
  default(options: ToastOptions|string|number): void {
    this.add(options, 'default');
  }

  /**
   * Create Toast of default type
   * @param  {object} options Individual toasty config overrides
   */
  info(options: ToastOptions|string|number): void {
    this.add(options, 'info');
  }

  /**
   * Create Toast of success type
   * @param  {object} options Individual toasty config overrides
   */
  success(options: ToastOptions|string|number): void {
    this.add(options, 'success');
  }

  /**
   * Create Toast of wait type
   * @param  {object} options Individual toasty config overrides
   */
  wait(options: ToastOptions|string|number): void {
    this.add(options, 'wait');
  }

  /**
   * Create Toast of error type
   * @param  {object} options Individual toasty config overrides
   */
  error(options: ToastOptions|string|number): void {
    this.add(options, 'error');
  }

  /**
   * Create Toast of warning type
   * @param  {object} options Individual toasty config overrides
   */
  warning(options: ToastOptions|string|number): void {
    this.add(options, 'warning');
  }


  // Add a new toast item
  private add(options: ToastOptions|string|number, type: string) {
    let toastyOptions: ToastOptions;

    if (isString(options) && options !== '' || isNumber(options)) {
      toastyOptions = <ToastOptions>{
        title: options.toString()
      };
    } else {
      toastyOptions = <ToastOptions>options;
    }

    if (!toastyOptions || !toastyOptions.title && !toastyOptions.msg) {
      throw new Error('ng2-toasty: No toast title or message specified!');
    }

    type = type || 'default';

    // Set a unique counter for an id
    this.uniqueCounter++;

    // Set the local vs global config items
    let showClose = this._checkConfigItem(this.config, toastyOptions, 'showClose');

    // If we have a theme set, make sure it's a valid one
    let theme: string;
    if (toastyOptions.theme) {
      theme = ToastyService.THEMES.indexOf(toastyOptions.theme) > -1 ? toastyOptions.theme : this.config.theme;
    } else {
      theme = this.config.theme;
    }

    let toast: ToastData = <ToastData>{
      id: this.uniqueCounter,
      title: toastyOptions.title,
      msg: toastyOptions.msg,
      showClose: showClose,
      type: 'toasty-type-' + type,
      theme: 'toasty-theme-' + theme,
      onAdd: toastyOptions.onAdd && isFunction(toastyOptions.onAdd) ? toastyOptions.onAdd : null,
      onRemove: toastyOptions.onRemove && isFunction(toastyOptions.onRemove) ? toastyOptions.onRemove : null
    };

    // If there's a timeout individually or globally, set the toast to timeout
    // Allows a caller to pass null/0 and override the default. Can also set the default to null/0 to turn off.
    toast.timeout = toastyOptions.hasOwnProperty('timeout') ? toastyOptions.timeout : this.config.timeout;


    // Push up a new toast item
    try {
      this.toastsSubscriber.next(toast);
      // If we have a onAdd function, call it here
      if (toastyOptions.onAdd && isFunction(toastyOptions.onAdd)) {
        toastyOptions.onAdd.call(this, toast);
      }
    } catch (e) {
      console.log(e);
      console.log('!!! Suggestion: Seems you forget add <ng2-toasty></ng2-toasty> into your html?');
    }
  }

  // Clear all toasts
  clearAll() {
    this.clearSubscriber.next();
  }

  // Checks whether the local option is set, if not,
  // checks the global config
  private _checkConfigItem(config: any, options: any, property: string) {
    if (options[property] === false) {
      return false;
    } else if (!options[property]) {
      return config[property];
    } else {
      return true;
    }
  }
}
