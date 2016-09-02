System.registerDynamic("src/toasty.utils", [], true, function ($__require, exports, module) {
  "use strict";
  /**
   * Check and return true if an object is type of string
   */

  var define,
      global = this || self,
      GLOBAL = global;
  function isString(obj) {
    return typeof obj === "string";
  }
  exports.isString = isString;
  /**
   * Check and return true if an object is type of number
   */
  function isNumber(obj) {
    return typeof obj === "number";
  }
  exports.isNumber = isNumber;
  /**
   * Check and return true if an object is type of Function
   */
  function isFunction(obj) {
    return typeof obj === "function";
  }
  exports.isFunction = isFunction;
  

  return module.exports;
});
System.registerDynamic("src/toasty.service", ["@angular/core", "./toasty.utils", "rxjs/Observable"], true, function ($__require, exports, module) {
    // Copyright (C) 2016 Sergey Akopkokhyants
    // This project is licensed under the terms of the MIT license.
    // https://github.com/akserg/ng2-toasty
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    var toasty_utils_1 = $__require("./toasty.utils");
    var Observable_1 = $__require("rxjs/Observable");
    /**
     * Default configuration foa all toats and toasty container
     */
    var ToastyConfig = function () {
        function ToastyConfig() {
            // Maximum number of toasties to show at once
            this.limit = 5;
            // Whether to show the 'X' icon to close the toast
            this.showClose = true;
            // The window position where the toast pops up. Possible values
            // bottom-right, bottom-left, top-right, top-left, top-center, bottom-center
            this.position = 'bottom-right';
            // How long (in miliseconds) the toasty shows before it's removed. Set to false to disable.
            this.timeout = 5000;
            // What theme to use. Possible values:
            // default, material or bootstrap
            this.theme = 'default';
        }
        ToastyConfig = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], ToastyConfig);
        return ToastyConfig;
    }();
    exports.ToastyConfig = ToastyConfig;
    /**
     * Toasty service helps create different kinds of Toasts
     */
    var ToastyService = function () {
        function ToastyService(config) {
            var _this = this;
            this.config = config;
            // Init the counter
            this.uniqueCounter = 0;
            this.toastsObservable = new Observable_1.Observable(function (subscriber) {
                _this.toastsSubscriber = subscriber;
            });
            this.clearObservable = new Observable_1.Observable(function (subscriber) {
                _this.clearSubscriber = subscriber;
            });
        }
        /**
         * Get list of toats
         */
        ToastyService.prototype.getToasts = function () {
            return this.toastsObservable;
        };
        ToastyService.prototype.getClear = function () {
            return this.clearObservable;
        };
        /**
         * Create Toast of a default type
         */
        ToastyService.prototype.default = function (options) {
            this.add(options, 'default');
        };
        /**
         * Create Toast of default type
         * @param  {object} options Individual toasty config overrides
         */
        ToastyService.prototype.info = function (options) {
            this.add(options, 'info');
        };
        /**
         * Create Toast of success type
         * @param  {object} options Individual toasty config overrides
         */
        ToastyService.prototype.success = function (options) {
            this.add(options, 'success');
        };
        /**
         * Create Toast of wait type
         * @param  {object} options Individual toasty config overrides
         */
        ToastyService.prototype.wait = function (options) {
            this.add(options, 'wait');
        };
        /**
         * Create Toast of error type
         * @param  {object} options Individual toasty config overrides
         */
        ToastyService.prototype.error = function (options) {
            this.add(options, 'error');
        };
        /**
         * Create Toast of warning type
         * @param  {object} options Individual toasty config overrides
         */
        ToastyService.prototype.warning = function (options) {
            this.add(options, 'warning');
        };
        // Add a new toast item
        ToastyService.prototype.add = function (options, type) {
            var toastyOptions;
            if (toasty_utils_1.isString(options) && options !== '' || toasty_utils_1.isNumber(options)) {
                toastyOptions = {
                    title: options.toString()
                };
            } else {
                toastyOptions = options;
            }
            if (!toastyOptions || !toastyOptions.title && !toastyOptions.msg) {
                throw new Error('ng2-toasty: No toast title or message specified!');
            }
            type = type || 'default';
            // Set a unique counter for an id
            this.uniqueCounter++;
            // Set the local vs global config items
            var showClose = this._checkConfigItem(this.config, toastyOptions, 'showClose');
            // If we have a theme set, make sure it's a valid one
            var theme;
            if (toastyOptions.theme) {
                theme = ToastyService.THEMES.indexOf(toastyOptions.theme) > -1 ? toastyOptions.theme : this.config.theme;
            } else {
                theme = this.config.theme;
            }
            var toast = {
                id: this.uniqueCounter,
                title: toastyOptions.title,
                msg: toastyOptions.msg,
                showClose: showClose,
                type: 'toasty-type-' + type,
                theme: 'toasty-theme-' + theme,
                onAdd: toastyOptions.onAdd && toasty_utils_1.isFunction(toastyOptions.onAdd) ? toastyOptions.onAdd : null,
                onRemove: toastyOptions.onRemove && toasty_utils_1.isFunction(toastyOptions.onRemove) ? toastyOptions.onRemove : null
            };
            // If there's a timeout individually or globally, set the toast to timeout
            // Allows a caller to pass null/0 and override the default. Can also set the default to null/0 to turn off.
            toast.timeout = toastyOptions.hasOwnProperty('timeout') ? toastyOptions.timeout : this.config.timeout;
            // Push up a new toast item
            try {
                this.toastsSubscriber.next(toast);
                // If we have a onAdd function, call it here
                if (toastyOptions.onAdd && toasty_utils_1.isFunction(toastyOptions.onAdd)) {
                    toastyOptions.onAdd.call(this, toast);
                }
            } catch (e) {
                console.log(e);
                console.log('!!! Suggestion: Seems you forget add <ng2-toasty></ng2-toasty> into your html?');
            }
        };
        // Clear all toasts
        ToastyService.prototype.clearAll = function () {
            this.clearSubscriber.next(null);
        };
        // Clear the specific one
        ToastyService.prototype.clear = function (id) {
            this.clearSubscriber.next(id);
        };
        // Checks whether the local option is set, if not,
        // checks the global config
        ToastyService.prototype._checkConfigItem = function (config, options, property) {
            if (options[property] === false) {
                return false;
            } else if (!options[property]) {
                return config[property];
            } else {
                return true;
            }
        };
        // Allowed THEMES
        ToastyService.THEMES = ['default', 'material', 'bootstrap'];
        ToastyService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [ToastyConfig])], ToastyService);
        return ToastyService;
    }();
    exports.ToastyService = ToastyService;
    

    return module.exports;
});
System.registerDynamic("src/toasty.component", ["@angular/core", "./toasty.utils", "./toasty.service"], true, function ($__require, exports, module) {
    // Copyright (C) 2016 Sergey Akopkokhyants
    // This project is licensed under the terms of the MIT license.
    // https://github.com/akserg/ng2-toasty
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    var toasty_utils_1 = $__require("./toasty.utils");
    var toasty_service_1 = $__require("./toasty.service");
    /**
     * Toasty is container for Toast components
     */
    var ToastyComponent = function () {
        function ToastyComponent(config, toastyService) {
            this.config = config;
            this.toastyService = toastyService;
            this._position = '';
            // The storage for toasts.
            this.toasts = [];
            // Initialise position
            this.position = '';
        }
        Object.defineProperty(ToastyComponent.prototype, "position", {
            get: function () {
                return this._position;
            },
            // The window position where the toast pops up. Possible values:
            // - bottom-right (default value from ToastConfig)
            // - bottom-left
            // - top-right
            // - top-left
            // - top-center
            // - bottom-center
            set: function (value) {
                if (value) {
                    var notFound = true;
                    for (var i = 0; i < ToastyComponent.POSITIONS.length; i++) {
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
            },
            enumerable: true,
            configurable: true
        });
        /**
         * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
         * first time, and before any of its children have been checked. It is invoked only once when the
         * directive is instantiated.
         */
        ToastyComponent.prototype.ngOnInit = function () {
            var _this = this;
            // We listen our service to recieve new toasts from it
            this.toastyService.getToasts().subscribe(function (toast) {
                // If we've gone over our limit, remove the earliest
                // one from the array
                if (_this.toasts.length >= _this.config.limit) {
                    _this.toasts.shift();
                }
                // Add toasty to array
                _this.toasts.push(toast);
                //
                // If there's a timeout individually or globally,
                // set the toast to timeout
                if (toast.timeout) {
                    _this._setTimeout(toast);
                }
            });
            // We listen clear all comes from service here.
            this.toastyService.getClear().subscribe(function (id) {
                if (id) {
                    _this.clear(id);
                }
                // Lets clear all toasts
                _this.clearAll();
            });
        };
        /**
         * Event listener of 'closeToast' event comes from ToastyComponent.
         * This method removes ToastComponent assosiated with this Toast.
         */
        ToastyComponent.prototype.closeToast = function (toast) {
            this.clear(toast.id);
        };
        /**
         * Clear individual toast by id
         * @param id is unique identifier of Toast
         */
        ToastyComponent.prototype.clear = function (id) {
            var _this = this;
            if (id) {
                this.toasts.forEach(function (value, key) {
                    if (value.id === id) {
                        if (value.onRemove && toasty_utils_1.isFunction(value.onRemove)) {
                            value.onRemove.call(_this, value);
                        }
                        _this.toasts.splice(key, 1);
                    }
                });
            } else {
                throw new Error('Please provide id of Toast to close');
            }
        };
        /**
         * Clear all toasts
         */
        ToastyComponent.prototype.clearAll = function () {
            var _this = this;
            this.toasts.forEach(function (value, key) {
                if (value.onRemove && toasty_utils_1.isFunction(value.onRemove)) {
                    value.onRemove.call(_this, value);
                }
            });
            this.toasts = [];
        };
        /**
         * Custom setTimeout function for specific setTimeouts on individual toasts.
         */
        ToastyComponent.prototype._setTimeout = function (toast) {
            var _this = this;
            window.setTimeout(function () {
                _this.clear(toast.id);
            }, toast.timeout);
        };
        /**
         * Set of constants defins position of Toasty on the page.
         */
        ToastyComponent.POSITIONS = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center'];
        __decorate([core_1.Input(), __metadata('design:type', String), __metadata('design:paramtypes', [String])], ToastyComponent.prototype, "position", null);
        ToastyComponent = __decorate([core_1.Component({
            selector: 'ng2-toasty',
            template: "\n    <div id=\"toasty\" [ngClass]=\"[position]\">\n        <ng2-toast *ngFor=\"let toast of toasts\" [toast]=\"toast\" (closeToast)=\"closeToast(toast)\"></ng2-toast>\n    </div>"
        }), __metadata('design:paramtypes', [toasty_service_1.ToastyConfig, toasty_service_1.ToastyService])], ToastyComponent);
        return ToastyComponent;
    }();
    exports.ToastyComponent = ToastyComponent;
    

    return module.exports;
});
System.registerDynamic("src/toast.component", ["@angular/core"], true, function ($__require, exports, module) {
    // Copyright (C) 2016 Sergey Akopkokhyants
    // This project is licensed under the terms of the MIT license.
    // https://github.com/akserg/ng2-toasty
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    /**
     * A Toast component shows message with title and close button.
     */
    var ToastComponent = function () {
        function ToastComponent() {
            this.closeToastEvent = new core_1.EventEmitter();
        }
        /**
         * Event handler invokes when user clicks on close button.
         * This method emit new event into ToastyContainer to close it.
         */
        ToastComponent.prototype.close = function ($event) {
            $event.preventDefault();
            this.closeToastEvent.next(this.toast);
        };
        __decorate([core_1.Input(), __metadata('design:type', Object)], ToastComponent.prototype, "toast", void 0);
        __decorate([core_1.Output('closeToast'), __metadata('design:type', Object)], ToastComponent.prototype, "closeToastEvent", void 0);
        ToastComponent = __decorate([core_1.Component({
            selector: 'ng2-toast',
            template: "\n        <div class=\"toast\" [ngClass]=\"[toast.type, toast.theme]\">\n            <div *ngIf=\"toast.showClose\" class=\"close-button\" (click)=\"close($event)\"></div>\n            <div *ngIf=\"toast.title || toast.msg\" class=\"toast-text\">\n                <span *ngIf=\"toast.title\" class=\"toast-title\">{{toast.title}}</span>\n                <br *ngIf=\"toast.title && toast.msg\" />\n                <span *ngIf=\"toast.msg\" class=\"toast-msg\">{{toast.msg}}</span>\n            </div>\n        </div>"
        }), __metadata('design:paramtypes', [])], ToastComponent);
        return ToastComponent;
    }();
    exports.ToastComponent = ToastComponent;
    

    return module.exports;
});
System.registerDynamic("index", ["@angular/core", "@angular/common", "./src/toasty.service", "./src/toasty.component", "./src/toast.component"], true, function ($__require, exports, module) {
    // Copyright (C) 2016 Sergey Akopkokhyants
    // This project is licensed under the terms of the MIT license.
    // https://github.com/akserg/ng2-toasty
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    var core_1 = $__require("@angular/core");
    var common_1 = $__require("@angular/common");
    __export($__require("./src/toasty.service"));
    __export($__require("./src/toasty.component"));
    var toasty_component_2 = $__require("./src/toasty.component");
    var toast_component_1 = $__require("./src/toast.component");
    var toasty_service_2 = $__require("./src/toasty.service");
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        providers: [toasty_service_2.ToastyConfig, toasty_service_2.ToastyService],
        directives: [toasty_component_2.ToastyComponent, toast_component_1.ToastComponent]
    };
    var ToastyModule = function () {
        function ToastyModule() {}
        ToastyModule = __decorate([core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [toast_component_1.ToastComponent, toasty_component_2.ToastyComponent],
            providers: [toasty_service_2.ToastyConfig, toasty_service_2.ToastyService],
            exports: [toasty_component_2.ToastyComponent]
        }), __metadata('design:paramtypes', [])], ToastyModule);
        return ToastyModule;
    }();
    exports.ToastyModule = ToastyModule;
    

    return module.exports;
});