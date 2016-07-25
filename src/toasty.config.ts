// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import {Injectable} from '@angular/core';

/**
 * Default configuration foa all toats and toasty container
 */
@Injectable()
export class ToastyConfig {

  // Maximum number of toasties to show at once
  limit: number = 5;

  // Whether to show the 'X' icon to close the toast
  showClose: boolean = true;

  // The window position where the toast pops up. Possible values
  // bottom-right, bottom-left, top-right, top-left, top-center, bottom-center
  position: string = 'bottom-right';

  // How long (in miliseconds) the toasty shows before it's removed. Set to false to disable.
  timeout: number = 5000;

  // What theme to use. Possible values:
  // default, material or bootstrap
  theme: string = 'default';
}
