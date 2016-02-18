import {Injectable} from 'angular2/core';

@Injectable()
export class ToastyConfig {
    // {int} Maximum number of toasties to show at once
    limit:number = 5;
    // {bool} Whether to show the 'X' icon to close the toasty
    showClose:boolean = true;
    // {bool} Whether clicking the toasty closes it
    clickToClose:boolean = false;
    // {string:bottom-right,bottom-left,top-right,top-left,top-center,bottom-center} The window
    // position where the toast pops up
    position:string = 'bottom-right';
    // {int} How long (in miliseconds) the toasty shows before it's removed. Set to false to
    // disable.
    timeout:number = 5000;
    // {bool} Whether to play a sound when a toast is added
    sound:boolean = true;
    // {bool} Whether HTML is allowed in toasts
    html:boolean = false;
    // {bool} Whether to shake the toasts
    shake:boolean = false;
    // {string} What theme to use; default, material or bootstrap
    theme:string = 'default';
}
