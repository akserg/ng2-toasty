# ng2-toasty [![Build Status](https://travis-ci.org/akserg/ng2-toasty.svg?branch=master)](https://travis-ci.org/akserg/ng2-toasty) [![npm version](https://img.shields.io/npm/v/ng2-toasty.svg)](https://www.npmjs.com/package/ng2-toasty) [![npm monthly downloads](https://img.shields.io/npm/dm/ng2-toasty.svg?style=flat-square)](https://www.npmjs.com/package/ng2-toasty)[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Angular2 Toasty component shows growl-style alerts and messages for your application.

Simple examples using ng2-toasty:
- with SystemJS in [ng2-systemjs-demo](https://github.com/akserg/ng2-systemjs-demo)
- with Webpack in [ng2-webpack-demo](https://github.com/akserg/ng2-webpack-demo)

Online demo available [here](https://akserg.github.io/ng2-toasty/)

## Installation
First you need to install the npm module:
```sh
npm install ng2-toasty --save
```

If you use SystemJS to load your files, you might have to update your config with this if you don't use `defaultJSExtensions: true`:
```js
System.config({
    packages: {
        "/ng2-toasty": {"defaultExtension": "js"}
    }
});
```


Finally, you can use *ng2-toasty* in your Angular 2 project:
- Import `ToastyService, ToastyConfig, Toasty, ToastOptions` from `ng2-toasty/ng2-toasty`
- Instantiate `ToastyService, ToastyConfig` in the bootstrap of your application;
- Add `Toasty` to the "directives" property of your application component;
- Add `<ng2-toasty></ng2-toasty>` tag in template of your application component.

```js
import {Component} from 'angular2/core';
import {ToastyService, ToastyConfig, Toasty, ToastOptions, ToastData} from 'ng2-toasty/ng2-toasty';
import {bootstrap} from 'angular2/platform/browser';

bootstrap(AppComponent, [
    ToastyService, ToastyConfig // It is required to have 1 unique instance of your service
]);

@Component({
    selector: 'app',
    directives: [Toasty],
    template: `
        <div>Hello world</div>
        <button (click)="addToast()">Add Toast</button>
        <ng2-toasty></ng2-toasty>
    `
})
export class AppComponent {
    
    constructor(private toastyService:ToastyService) { }
    
    addToast() {
        // Just add default Toast with title only
        this.toastyService.default('Hi there');
        // Or create the instance of ToastOptions
        var toastOptions:ToastOptions = {
            title: "My title",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default'
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.toastyService.info(toastOptions);
        this.toastyService.success(toastOptions);
        this.toastyService.wait(toastOptions);
        this.toastyService.error(toastOptions);
        this.toastyService.warning(toastOptions);
    }
}
```

Inspired by [angular-toasty](https://github.com/teamfa/angular-toasty)