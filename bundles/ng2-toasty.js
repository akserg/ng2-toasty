System.registerDynamic("src/toasty.container", ["angular2/core", "angular2/common", "angular2/src/facade/lang", "./toasty.config", "./toasty.service", "./toasty.component"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var lang_1 = $__require('angular2/src/facade/lang');
  var toasty_config_1 = $__require('./toasty.config');
  var toasty_service_1 = $__require('./toasty.service');
  var toasty_component_1 = $__require('./toasty.component');
  var ToastyContainer = (function() {
    function ToastyContainer(config, toastyService) {
      this.config = config;
      this.toastyService = toastyService;
      this.toasts = [];
    }
    ToastyContainer.prototype.ngOnInit = function() {
      var _this = this;
      this.toastyService.getToasts().subscribe(function(toast) {
        if (_this.toasts.length >= _this.config.limit) {
          _this.toasts.shift();
        }
        _this.toasts.push(toast);
        if (toast.timeout) {
          _this._setTimeout(toast);
        }
      });
      if (this.position) {
        var notFound = true;
        for (var i = 0; i < ToastyContainer.POSITIONS.length; i++) {
          if (ToastyContainer.POSITIONS[i] === this.position) {
            notFound = false;
            break;
          }
        }
        if (notFound) {
          this.position = this.config.position;
        }
      } else {
        this.position = this.config.position;
      }
      this.position = 'toasty-position-' + this.position;
    };
    ToastyContainer.prototype.closeToast = function(toast) {
      this.clear(toast.id);
    };
    ToastyContainer.prototype.clickOnToast = function(toast) {
      if (toast.onClick && lang_1.isFunction(toast.onClick))
        toast.onClick.call(this, toast);
      if (toast.clickToClose)
        this.clear(toast.id);
    };
    ToastyContainer.prototype.clear = function(id) {
      var _this = this;
      if (id) {
        this.toasts.forEach(function(value, key) {
          if (value.id === id) {
            if (value.onRemove && lang_1.isFunction(value.onRemove))
              value.onRemove.call(_this, value);
            _this.toasts.splice(key, 1);
          }
        });
      } else {
        throw new Error('Please provide id of Toast to close');
      }
    };
    ToastyContainer.prototype.clearAll = function(id) {
      var _this = this;
      this.toasts.forEach(function(value, key) {
        if (value.onRemove && lang_1.isFunction(value.onRemove))
          value.onRemove.call(_this, value);
      });
      this.toasts = [];
    };
    ToastyContainer.prototype._setTimeout = function(toast) {
      var _this = this;
      window.setTimeout(function() {
        console.log('clear', toast.id);
        _this.clear(toast.id);
      }, toast.timeout);
    };
    ToastyContainer.POSITIONS = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center'];
    __decorate([core_1.Input(), __metadata('design:type', String)], ToastyContainer.prototype, "position", void 0);
    ToastyContainer = __decorate([core_1.Component({
      selector: 'ng2-toasty',
      encapsulation: core_1.ViewEncapsulation.None,
      directives: [common_1.CORE_DIRECTIVES, toasty_component_1.ToastyComponent],
      template: "\n    <div id=\"toasty\" [ngClass]=\"[position]\">\n        <ng2-toast *ngFor=\"#toast of toasts\" [toast]=\"toast\" (closeToast)=\"closeToast(toast)\" (clickOnToast)=\"clickOnToast(toast)\"></ng2-toast>\n    </div>"
    }), __metadata('design:paramtypes', [toasty_config_1.ToastyConfig, toasty_service_1.ToastyService])], ToastyContainer);
    return ToastyContainer;
  })();
  exports.ToastyContainer = ToastyContainer;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("src/toasty.component", ["angular2/core", "angular2/common"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var ToastyComponent = (function() {
    function ToastyComponent() {
      this.closeToastEvent = new core_1.EventEmitter();
      this.clickOnToastEvent = new core_1.EventEmitter();
    }
    ToastyComponent.prototype.close = function($event) {
      $event.preventDefaults();
      this.closeToastEvent.emit('closeToast');
    };
    ToastyComponent.prototype.clickToasty = function($event) {
      $event.preventDefaults();
      this.clickOnToastEvent.emit('clickOnToast');
    };
    __decorate([core_1.Input(), __metadata('design:type', Object)], ToastyComponent.prototype, "toast", void 0);
    __decorate([core_1.Output('closeToast'), __metadata('design:type', Object)], ToastyComponent.prototype, "closeToastEvent", void 0);
    __decorate([core_1.Output('clickOnToast'), __metadata('design:type', Object)], ToastyComponent.prototype, "clickOnToastEvent", void 0);
    ToastyComponent = __decorate([core_1.Component({
      selector: 'ng2-toast',
      directives: [common_1.CORE_DIRECTIVES],
      template: "\n        <div class=\"toast\" [ngClass]=\"[toast.type, toast.theme, toast.shake]\" (click)=\"clickToasty($event)\">\n            <div *ngIf=\"toast.showClose\" class=\"close-button\" (click)=\"close($event)\"></div>\n            <div *ngIf=\"toast.title || toast.msg\" class=\"toast-text\">\n                <span *ngIf=\"toast.title\" class=\"toast-title\">{{toast.title}}</span>\n                <br *ngIf=\"toast.title && toast.msg\" />\n                <span *ngIf=\"toast.msg\" class=\"toast-msg\">{{toast.msg}}</span>\n            </div>\n        </div>"
    }), __metadata('design:paramtypes', [])], ToastyComponent);
    return ToastyComponent;
  })();
  exports.ToastyComponent = ToastyComponent;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("src/toasty.config", ["angular2/core"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var ToastyConfig = (function() {
    function ToastyConfig() {
      this.limit = 5;
      this.showClose = true;
      this.clickToClose = false;
      this.position = 'bottom-right';
      this.timeout = 5000;
      this.sound = true;
      this.html = false;
      this.shake = false;
      this.theme = 'default';
    }
    ToastyConfig = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], ToastyConfig);
    return ToastyConfig;
  })();
  exports.ToastyConfig = ToastyConfig;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("src/toasty.service", ["angular2/core", "angular2/src/facade/lang", "rxjs/Observable", "./toasty.config"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var lang_1 = $__require('angular2/src/facade/lang');
  var Observable_1 = $__require('rxjs/Observable');
  var toasty_config_1 = $__require('./toasty.config');
  var ToastyService = (function() {
    function ToastyService(config) {
      var _this = this;
      this.config = config;
      this.uniqueCounter = 0;
      this.toastsObservable = new Observable_1.Observable(function(subscriber) {
        _this.toastsSubscriber = subscriber;
      });
    }
    ToastyService.prototype.getToasts = function() {
      return this.toastsObservable;
    };
    ToastyService.prototype.default = function(options) {
      this.add(options, 'default');
    };
    ToastyService.prototype.info = function(options) {
      this.add(options, 'info');
    };
    ToastyService.prototype.success = function(options) {
      this.add(options, 'success');
    };
    ToastyService.prototype.wait = function(options) {
      this.add(options, 'wait');
    };
    ToastyService.prototype.error = function(options) {
      this.add(options, 'error');
    };
    ToastyService.prototype.warning = function(options) {
      this.add(options, 'warning');
    };
    ToastyService.prototype.add = function(options, type) {
      var toastyOptions;
      if (lang_1.isString(options) && options !== '' || lang_1.isNumber(options)) {
        toastyOptions = {title: options.toString()};
      } else {
        toastyOptions = options;
      }
      if (!toastyOptions || !toastyOptions.title && !toastyOptions.msg) {
        console.error('ng2-toasty: No toast title or message specified!');
      } else {
        toastyOptions.type = type || 'default';
      }
      this.uniqueCounter++;
      var sound = this.checkConfigItem(this.config, toastyOptions, 'sound');
      var showClose = this.checkConfigItem(this.config, toastyOptions, 'showClose');
      var clickToClose = this.checkConfigItem(this.config, toastyOptions, 'clickToClose');
      var html = this.checkConfigItem(this.config, toastyOptions, 'html');
      var shake = this.checkConfigItem(this.config, toastyOptions, 'shake');
      var theme;
      if (toastyOptions.theme) {
        theme = ToastyService.THEMES.indexOf(toastyOptions.theme) > -1 ? toastyOptions.theme : this.config.theme;
      } else {
        theme = this.config.theme;
      }
      var toast = {
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
        onAdd: toastyOptions.onAdd && lang_1.isFunction(toastyOptions.onAdd) ? toastyOptions.onAdd : null,
        onRemove: toastyOptions.onRemove && lang_1.isFunction(toastyOptions.onRemove) ? toastyOptions.onRemove : null,
        onClick: toastyOptions.onClick && lang_1.isFunction(toastyOptions.onClick) ? toastyOptions.onClick : null
      };
      if (toastyOptions.timeout) {
        toast.timeout = toastyOptions.timeout || this.config.timeout;
      } else {
        toast.timeout = null;
      }
      this.toastsSubscriber.next(toast);
      if (toastyOptions.onAdd && lang_1.isFunction(toastyOptions.onAdd)) {
        toastyOptions.onAdd.call(this, toast);
      }
    };
    ToastyService.prototype.checkConfigItem = function(config, options, property) {
      if (options[property] === false) {
        return false;
      } else if (!options[property]) {
        return config[property];
      } else {
        return true;
      }
    };
    ToastyService.prototype.trustAsHtml = function(input) {
      return input;
    };
    ToastyService.THEMES = ['default', 'material', 'bootstrap'];
    ToastyService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [toasty_config_1.ToastyConfig])], ToastyService);
    return ToastyService;
  })();
  exports.ToastyService = ToastyService;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("ng2-toasty", ["./src/toasty.container", "./src/toasty.component", "./src/toasty.config", "./src/toasty.service"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var toasty_container_1 = $__require('./src/toasty.container');
  var toasty_component_1 = $__require('./src/toasty.component');
  var toasty_config_1 = $__require('./src/toasty.config');
  var toasty_service_1 = $__require('./src/toasty.service');
  __export($__require('./src/toasty.container'));
  __export($__require('./src/toasty.component'));
  __export($__require('./src/toasty.config'));
  __export($__require('./src/toasty.service'));
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {
    providers: [toasty_config_1.ToastyConfig, toasty_service_1.ToastyService],
    directives: [toasty_container_1.ToastyContainer, toasty_component_1.ToastyComponent]
  };
  global.define = __define;
  return module.exports;
});
