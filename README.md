# Angular 2 Toasty [![npm version](https://badge.fury.io/js/ng2-toasty.svg)](https://badge.fury.io/js/ng2-toasty) [![npm monthly downloads](https://img.shields.io/npm/dm/ng2-toasty.svg?style=flat-square)](https://www.npmjs.com/package/ng2-toasty)
Angular2 Toasty component shows growl-style alerts and messages for your application.

[![Build Status](https://travis-ci.org/akserg/ng2-toasty.svg?branch=master)](https://travis-ci.org/akserg/ng2-toasty) 
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Dependency Status](https://david-dm.org/akserg/ng2-toasty.svg)](https://david-dm.org/akserg/ng2-toasty)
[![devDependency Status](https://david-dm.org/akserg/ng2-toasty/dev-status.svg)](https://david-dm.org/akserg/ng2-toasty#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/akserg/ng2-toasty/badge.svg)](https://snyk.io/test/github/akserg/ng2-toasty)

Follow me [![twitter](https://img.shields.io/twitter/follow/akopkokhyants.svg?style=social&label=%20akopkokhyants)](https://twitter.com/akopkokhyants) to be notified about new releases.

_Some of these APIs and Components are not final and are subject to change!_

## Installation
```sh
npm install ng2-toasty --save
```

## Demo
Simple examples using ng2-dnd:
- with SystemJS in [ng2-systemjs-demo](https://github.com/akserg/ng2-systemjs-demo)
- with Webpack in [ng2-webpack-demo](https://github.com/akserg/ng2-webpack-demo)

Online demo available [here](http://akserg.github.io/ng2-webpack-demo)

Plunker demo available [here](http://plnkr.co/edit/M2rQVb)

## Usage
If you use SystemJS to load your files, you might have to update your config:

```js
System.config({
    map: {
        'ng2-toasty': 'node_modules/ng2-toasty/bundles/index.umd.js'
    }
});
```

#### 1. Update the markup
- Import style into your web page. Choose one of the following files;
  - `style-default.css` - Contains DEFAULT theme
  - `style-bootstrap.css` - Contains Bootstrap 3 theme
  - `style-material.css` - Contains Material Design theme
- Assign the selected theme name [`default`, `bootstrap`, `material`] to the `theme` property of the instance of ToastyConfig.
- Add `<ng2-toasty></ng2-toasty>` tag in template of your application component.

#### 2. Import the `ToastyModule`
Import `ToastyModule.forRoot()` in the NgModule of your application. 
The `forRoot` method is a convention for modules that provide a singleton service.

```ts
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {ToastyModule} from 'ng2-toasty';

@NgModule({
    imports: [
        BrowserModule,
        ToastyModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

If you have multiple NgModules and you use one as a shared NgModule (that you import in all of your other NgModules), 
don't forget that you can use it to export the `ToastyModule` that you imported in order to avoid having to import it multiple times.

```ts
@NgModule({
    imports: [
        BrowserModule,
        ToastyModule.forRoot()
    ],
    exports: [BrowserModule, ToastyModule],
})
export class SharedModule {
}
```

#### 3. Use the `ToastyService` for your application
- Import `ToastyService` from `ng2-toasty` in your application code:

```js
import {Component} from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
    selector: 'app',
    template: `
        <div>Hello world</div>
        <button (click)="addToast()">Add Toast</button>
        <ng2-toasty></ng2-toasty>
    `
})
export class AppComponent {
    
    constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig. 
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'material';
    }
    
    addToast() {
        // Just add default Toast with title only
        this.toastyService.default('Hi there');
        // Or create the instance of ToastOptions
        var toastOptions:ToastOptions = {
            title: "My title",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default',
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

#### 4. How dynamically update title and message of a toast
Here is an example of how to dynamically update message and title of individual toast:

```js
import {Component} from '@angular/core';
import {ToastyService, ToastyConfig, ToastyComponent, ToastOptions, ToastData} from 'ng2-toasty';
import {Subject, Observable, Subscription} from 'rxjs/Rx';

@Component({
    selector: 'app',
    template: `
        <div>Hello world</div>
        <button (click)="addToast()">Add Toast</button>
        <ng2-toasty></ng2-toasty>
    `
})
export class AppComponent {
    
    getTitle(num: number): string {
        return 'Countdown: ' + num;
    }

    getMessage(num: number): string {
        return 'Seconds left: ' + num;
    }
    
    constructor(private toastyService:ToastyService) { }
    
    addToast() {
        let interval = 1000;
        let timeout = 5000;
        let seconds = timeout / 1000;
        let subscription: Subscription;
        
        let toastOptions: ToastOptions = {
            title: this.getTitle(seconds),
            msg: this.getMessage(seconds),
            showClose: true,
            timeout: timeout,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
                // Run the timer with 1 second iterval
                let observable = Observable.interval(interval).take(seconds);
                // Start listen seconds beat
                subscription = observable.subscribe((count: number) => {
                    // Update title of toast
                    toast.title = this.getTitle(seconds - count - 1);
                    // Update message of toast
                    toast.msg = this.getMessage(seconds - count - 1);
                });

            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
                // Stop listenning
                subscription.unsubscribe();
            }
        };

        switch (this.options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }
}
```

#### 5. How to close specific toast
Here is an example of how to close an individual toast:

```js
import {Component} from '@angular/core';
import {ToastyService, ToastyConfig, ToastyComponent, ToastOptions, ToastData} from 'ng2-toasty';
import {Subject, Observable, Subscription} from 'rxjs/Rx';

@Component({
    selector: 'app',
    template: `
        <div>Hello world</div>
        <button (click)="addToast()">Add Toast</button>
        <ng2-toasty></ng2-toasty>
    `
})
export class AppComponent {
    
    getTitle(num: number): string {
        return 'Countdown: ' + num;
    }

    getMessage(num: number): string {
        return 'Seconds left: ' + num;
    }
    
    constructor(private toastyService:ToastyService) { }
    
    addToast() {
        let interval = 1000;
        let subscription: Subscription;
        
        let toastOptions: ToastOptions = {
            title: this.getTitle(0),
            msg: this.getMessage(0),
            showClose: true,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
                // Run the timer with 1 second iterval
                let observable = Observable.interval(interval);
                // Start listen seconds beat
                subscription = observable.subscribe((count: number) => {
                    // Update title of toast
                    toast.title = this.getTitle(count);
                    // Update message of toast
                    toast.msg = this.getMessage(count);
                    // Extra condition to hide Toast after 10 sec
                    if (count > 10) {
                        // We use toast id to identify and hide it
                        this.toastyService.clear(toast.id);
                    }
                });

            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
                // Stop listenning
                subscription.unsubscribe();
            }
        };

        switch (this.options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }
}
```

#### 6. Customize the `ng2-toasty` for your application in template
You can use the following properties to customize the ng2-toasty component in your template:

- `position` - The window position where the toast pops up. Default value is `bottom-right`. Possible values: `bottom-right`, `bottom-left`, `top-right`, `top-left`, `top-center`, `bottom-center`, `center-center`
Example:

```html
<ng2-toasty [position]="'top-center'"></ng2-toasty>
```

# Credits 
Inspired by [angular-toasty](https://github.com/teamfa/angular-toasty)

# License
 [MIT](/LICENSE
