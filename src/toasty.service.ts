import {Injectable} from 'angular2/core';
import {isString, isNumber, isFunction} from 'angular2/src/facade/lang';

import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {ToastyConfig} from './toasty.config';

/**
 * Options to configure specific Toast
 */
export interface ToastOptions {
    title: string;
    msg?:string;
    type?:string;
    theme?:string;
    onAdd?:Function;
    onRemove?:Function;
    onClick?:Function;
    timeout?:number;
}

/**
 * Structrure of Toast
 */
export interface Toast {
    id:number;
    title:string;
    msg:string;
    showClose:boolean;
    clickToClose:boolean;
    sound:boolean;
    shake:string;
    html:string;
    type: string;
    theme:string;
    timeout:number;
    onAdd:Function;
    onRemove:Function;
    onClick:Function;
}

/**
 * Toasty service helps create different kinds of Toasts
 */
@Injectable()
export class ToastyService {
    // Init the counter
    uniqueCounter: number = 0;
    // Allowed THEMES
    static THEMES: Array<string> = ['default', 'material', 'bootstrap'];

    private toastsObservable:Observable<Toast>;
    private toastsSubscriber: Subscriber<Toast>;

    constructor(private config:ToastyConfig) {
        this.toastsObservable = new Observable((subscriber:Subscriber<Toast>) => {
            this.toastsSubscriber = subscriber;
        });
    }

    /**
     * Get list of toats
     */
    getToasts():Observable<Toast> {
        return this.toastsObservable;
    }

    /**
     * Create Toasty of a default type
     */
    default(options:ToastOptions|string|number):void {
        this.add(options, 'default');
    }

    /**
     * Create Toasty of default type
     * @param  {object} options Individual toasty config overrides
     */
    info(options:ToastOptions|string|number):void {
         this.add(options, 'info');
    }

    /**
     * Create Toasty of success type
     * @param  {object} options Individual toasty config overrides
     */
    success(options:ToastOptions|string|number):void {
        this.add(options, 'success');
    }

    /**
     * Create Toasty of wait type
     * @param  {object} options Individual toasty config overrides
     */
    wait(options:ToastOptions|string|number):void {
        this.add(options, 'wait');
    }

    /**
     * Create Toasty of error type
     * @param  {object} options Individual toasty config overrides
     */
    error(options:ToastOptions|string|number):void {
        this.add(options, 'error');
    }

    /**
     * Create Toasty of warning type
     * @param  {object} options Individual toasty config overrides
     */
    warning(options:ToastOptions|string|number):void {
        this.add(options, 'warning');
    }


    // Add a new toast item
    private add(options:ToastOptions|string|number, type:string) {
        var toastyOptions:ToastOptions;

        if (isString(options) && options !== '' || isNumber(options)) {
			toastyOptions = <ToastOptions>{
				title: options.toString()
			};
		} else {
            toastyOptions = <ToastOptions>options;
        }

		if (!toastyOptions || !toastyOptions.title && !toastyOptions.msg) {
			console.error('ng2-toasty: No toast title or message specified!');
		} else {
			toastyOptions.type = type || 'default';
		}

        // Set a unique counter for an id
        this.uniqueCounter++;

        // Set the local vs global config items
        var sound = this.checkConfigItem(this.config, toastyOptions, 'sound');
        var showClose = this.checkConfigItem(this.config, toastyOptions, 'showClose');
        var clickToClose = this.checkConfigItem(this.config, toastyOptions, 'clickToClose');
        var html = this.checkConfigItem(this.config, toastyOptions, 'html');
        var shake = this.checkConfigItem(this.config, toastyOptions, 'shake');

        // If we have a theme set, make sure it's a valid one
        var theme:string;
        if (toastyOptions.theme) {
            theme = ToastyService.THEMES.indexOf(toastyOptions.theme) > -1 ? toastyOptions.theme : this.config.theme;
        } else {
            theme = this.config.theme;
        }

        var toast:Toast = <Toast>{
            id: this.uniqueCounter,
            title: html ? this.trustAsHtml(toastyOptions.title) : toastyOptions.title,
            msg: html ? this.trustAsHtml(toastyOptions.msg) : toastyOptions.msg,
            showClose: showClose,
            clickToClose: clickToClose,
            sound: sound,
            shake: shake ? 'toasty-shake' : '',
            html: html,
            type: 'toasty-type-' + toastyOptions.type,
            theme: 'toasty-theme-' + theme,
            onAdd: toastyOptions.onAdd && isFunction(toastyOptions.onAdd) ? toastyOptions.onAdd : null,
            onRemove: toastyOptions.onRemove && isFunction(toastyOptions.onRemove) ? toastyOptions.onRemove : null,
            onClick: toastyOptions.onClick && isFunction(toastyOptions.onClick) ? toastyOptions.onClick : null
        };

        // If there's a timeout individually or globally,
        // set the toast to timeout
        if (toastyOptions.timeout) {
            toast.timeout = toastyOptions.timeout || this.config.timeout;
        } else {
            toast.timeout = null;
        }


        // Push up a new toast item
        this.toastsSubscriber.next(toast);

        // If we have a onAdd function, call it here
        if (toastyOptions.onAdd && isFunction(toastyOptions.onAdd)) {
            toastyOptions.onAdd.call(this, toast);
        }
    }

    // Checks whether the local option is set, if not,
    // checks the global config
    checkConfigItem(config:any, options:any, property:string) {
        if (options[property] === false) {
            return false;
        } else if (!options[property]) {
            return config[property];
        } else {
            return true;
        }
    }

    trustAsHtml(input:string):string {
        return input;
    }
}

