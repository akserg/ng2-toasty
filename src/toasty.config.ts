// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import {Injectable} from 'angular2/core';

@Injectable()
export class ToastyConfig {
    // {int} Maximum number of toasties to show at once
    limit:number = 5;
    // {bool} Whether to show the 'X' icon to close the toasty
    showClose:boolean = true;
    // {string:bottom-right,bottom-left,top-right,top-left,top-center,bottom-center} The window
    // position where the toast pops up
    position:string = 'bottom-right';
    // {int} How long (in miliseconds) the toasty shows before it's removed. Set to false to
    // disable.
    timeout:number = 5000;
    // {string} What theme to use; default, material or bootstrap
    theme:string = 'default';
}
