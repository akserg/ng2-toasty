import {Injectable} from 'angular2/core';
import {isString, isNumber, isFunction} from 'angular2/src/facade/lang';

import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {ToastyConfig} from './toasty.config';

export interface ToastyOptions {
    title: string;
    msg?:string;
    type?:string;
    theme?:string;
    onAdd?:Function;
    onRemove?:Function;
    onClick?:Function;
    timeout?:number;
}

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
    onAdd:Function;
    onRemove:Function;
    onClick:Function;

    interact?:boolean;
    timeout?:number;
}

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

    getToasts():Observable<Toast> {
        return this.toastsObservable;
    }

    /**
     * Create Toasty of a default type
     */
    default(options:ToastyOptions|string|number):void {
        this.add(options, 'default');
    }

    /**
     * Create Toasty of default type
     * @param  {object} options Individual toasty config overrides
     */
    info(options:ToastyOptions|string|number):void {
         this.add(options, 'info');
    }

    /**
     * Create Toasty of success type
     * @param  {object} options Individual toasty config overrides
     */
    success(options:ToastyOptions|string|number):void {
        this.add(options, 'success');
    }

    /**
     * Create Toasty of wait type
     * @param  {object} options Individual toasty config overrides
     */
    wait(options:ToastyOptions|string|number):void {
        this.add(options, 'wait');
    }

    /**
     * Create Toasty of error type
     * @param  {object} options Individual toasty config overrides
     */
    error(options:ToastyOptions|string|number):void {
        this.add(options, 'error');
    }

    /**
     * Create Toasty of warning type
     * @param  {object} options Individual toasty config overrides
     */
    warning(options:ToastyOptions|string|number):void {
        this.add(options, 'warning');
    }


    // Add a new toast item
    private add(options:ToastyOptions|string|number, type:string) {
        var toastyOptions:ToastyOptions;

        if (isString(options) && options !== '' || isNumber(options)) {
			toastyOptions = <ToastyOptions>{
				title: options.toString()
			};
		} else {
            toastyOptions = <ToastyOptions>options;
        }

		if (!toastyOptions || !toastyOptions.title && !toastyOptions.msg) {
			console.error('ng2-toasty: No toast title or message specified!');
		} else {
			toastyOptions.type = type || 'default';
			// $rootScope.$broadcast('toasty-new', {config: config, options: options});
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

        // If sound is enabled, play the audio tag
        // if (sound)
        //     (<HTMLMediaElement>document.getElementById('toasty-sound')).play();

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

        //console.log('Toast', toast);

        // Push up a new toast item
        this.toastsSubscriber.next(toast);

        // If we have a onAdd function, call it here
        if (toastyOptions.onAdd && isFunction(toastyOptions.onAdd)) {
            toastyOptions.onAdd.call(this, toast);
        }

        // Broadcast that the toasty was added
        //this.$broadcast('toasty-added', toast);

        // If there's a timeout individually or globally,
        // set the toast to timeout
        if (toastyOptions.timeout) {
            toast.timeout = toastyOptions.timeout || this.config.timeout;
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

    // On new rootScope toasty-new broadcast
    // scope.$on('toasty-new', function(event, data) {
    //     var config = data.config;
    //     var options = data.options;

    //     if (!scope.position)
    //         scope.position = 'toasty-position-' + config.position;

    //     add(config, options);
    // });

    // On new rootScope toasty-clear broadcast
    // scope.$on('toasty-clear', function(event, data) {
    //     clear(data.id);
    // });

}

// import {Injectable} from 'angular2/core';
// import {isString, isNumber} from 'angular2/src/facade/lang';

// import {Toasty} from './toasty';

// // import {EscapeHtmlPipe} from './toasty.pipes';
//  import {ToastyConfig} from './toasty.config';

// @Injectable()
// export class ToastyService {

//     uniqueCounter:number = 0;

//     // Allowed THEMES
//     THEMES = ['default', 'material', 'bootstrap'];

//     // Init the toasty store
//     toasty = [];

//     constructor(private config:ToastyConfig) {}

//     /**
//      * Create Toasty of a default type
//      */
//     default(options:any):void {
//         this.add(this.config, new Toasty(options));
//     }

//     /**
//      * Create Toasty of default type
//      * @param  {object} options Individual toasty config overrides
//      */
//     info(options:any):void {
//          this.add(this.config, new Toasty(options, 'info'));
//     }

//     /**
//      * Create Toasty of success type
//      * @param  {object} options Individual toasty config overrides
//      */
//     success(options:any):void {
//         this.add(this.config, new Toasty(options, 'success'));
//     }

//     /**
//      * Create Toasty of wait type
//      * @param  {object} options Individual toasty config overrides
//      */
//     wait(options:any):void {
//         this.add(this.config, new Toasty(options, 'wait'));
//     }

//     /**
//      * Create Toasty of error type
//      * @param  {object} options Individual toasty config overrides
//      */
//     error(options:any):void {
//         this.add(this.config, new Toasty(options, 'error'));
//     }

//     /**
//      * Create Toasty of warning type
//      * @param  {object} options Individual toasty config overrides
//      */
//     warning(options:any):void {
//         this.add(this.config, new Toasty(options, 'warning'));
//     }

//     /**
//      * Add a new toast item
//      *
//      */
//     add(config, toasty:Toasty) {
//         // Set a unique counter for an id
//         this.uniqueCounter++;

//         // Set the local vs global config items
//         var sound = this.checkConfigItem(config, options, 'sound');
//         var showClose = this.checkConfigItem(config, options, 'showClose');
//         var clickToClose = this.checkConfigItem(config, options, 'clickToClose');
//         var html = this.checkConfigItem(config, options, 'html');
//         var shake = this.checkConfigItem(config, options, 'shake');
//     }

//     /**
//      * Broadcast a clear event
// 	 * @param {int} Optional ID of the toasty to clear
//      */
//     clear(id:number) {

//     }

//     // Checks whether the local option is set, if not,
//     // checks the global config
//     checkConfigItem(config, options, property) {
//         if (options[property] == false) {
//             return false;
//         } else if (!options[property]) {
//             return config[property];
//         } else {
//             return true;
//         }
//     }
// }

// // private config:voidConfig, private escape:EscapeHtmlPipe
// @Injectable()
// export class ToastyServiceHelper {

//     uniqueCounter:number = 0;

//     // Allowed THEMES
//     THEMES = ['default', 'material', 'bootstrap'];

//     // Init the toasty store
//     toasty = [];

//     // Add a new toast item
//     add(config, options) {
//         // Set a unique counter for an id
//         this.uniqueCounter++;

//         // Set the local vs global config items
//         var sound = this.checkConfigItem(config, options, 'sound');
//         var showClose = this.checkConfigItem(config, options, 'showClose');
//         var clickToClose = this.checkConfigItem(config, options, 'clickToClose');
//         var html = this.checkConfigItem(config, options, 'html');
//         var shake = this.checkConfigItem(config, options, 'shake');

//         // If we have a theme set, make sure it's a valid one
//         var theme;
//         if (options.theme) {
//             theme = this.THEMES.indexOf(options.theme) > -1 ? options.theme : config.theme;
//         } else {
//             theme = config.theme;
//         }

//         // If we've gone over our limit, remove the earliest
//         // one from the array
//         if (this.toasty.length >= config.limit)
//             this.toasty.shift();

//         // If sound is enabled, play the audio tag
//         if (sound) {
//             (<HTMLMediaElement>document.getElementById('toasty-sound')).play();
//         }

//         var toast = {
//             id: this.uniqueCounter,
//             title: html ? this.escape.transform(options.title) : options.title,
//             msg: html ? this.escape.transform(options.msg) : options.msg,
//             showClose: showClose,
//             clickToClose: clickToClose,
//             sound: sound,
//             shake: shake ? 'toasty-shake' : '',
//             html: html,
//             type: 'toasty-type-' + options.type,
//             theme: 'toasty-theme-' + theme,
//             onAdd: options.onAdd || null, //&& angular.isFunction(options.onAdd) ? options.onAdd : null,
//             onRemove: options.onRemove || null, //&& angular.isFunction(options.onRemove) ? options.onRemove : null,
//             onClick: options.onClick || null //&& angular.isFunction(options.onClick) ? options.onClick : null
//         };

//         // Push up a new toast item
//         this.toasty.push(toast);

//         // If we have a onAdd function, call it here
//         if (options.onAdd) { // && angular.isFunction(options.onAdd))
//             options.onAdd.call(toast);
//         }

//         // Broadcast that the toasty was added
//         // scope.$broadcast('toasty-added', toast);

//         // If there's a timeout individually or globally,
//         // set the toast to timeout
//         if (options.timeout != false) {
//             if (options.timeout || config.timeout)
//                 setTimeout(this.toasty[this.toasty.length - 1], options.timeout || config.timeout);
//         }

//     }

//     // Checks whether the local option is set, if not,
//     // checks the global config
//     checkConfigItem(config, options, property) {
//         if (options[property] == false) {
//             return false;
//         } else if (!options[property]) {
//             return config[property];
//         } else {
//             return true;
//         }
//     }
// }
