# ng2-toasty [![Build Status](https://travis-ci.org/akserg/ng2-toasty.svg?branch=master)](https://travis-ci.org/akserg/ng2-toasty) [![npm version](https://img.shields.io/npm/v/ng2-toasty.svg)](https://www.npmjs.com/package/ng2-toasty)
Angular2 Toasty component shows growl-style alerts and messages for your app.

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

Finally, you can use ng2-toasty in your Angular 2 project:
- Instantiate `ToastyService` in the bootstrap of your application;
- Add `Ng2Toasty` to the "directives" property of your application component;
- Add `ng2-toasty` tag in template of your application component.

```js
import {Component} from 'angular2/core';
import {ToastyService, Ng2Toasty} from 'ng2-toasty/ng2-toasty';
import {bootstrap} from 'angular2/platform/browser';

bootstrap(AppComponent, [
    ToastyService // It is required to have 1 unique instance of your service
]);

@Component({
    selector: 'app',
    directives: [Ng2Toasty],
    template: `
        <div>Hello world</div>
        <ng2-toasty></ng2-toasty>
    `
})
export class AppComponent {}
```
