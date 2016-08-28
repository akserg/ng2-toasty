// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

'use strict';

import {ToastyComponent} from './src/toasty.component';
import {ToastComponent} from './src/toast.component';
import {ToastyService, ToastyConfig} from './src/toasty.service';

export * from './src/toasty.component';
export * from './src/toast.component';
export * from './src/toasty.service';
export * from './src/toasty.utils';

export default {
  providers: [ToastyConfig, ToastyService],
  directives: [ToastyComponent, ToastComponent]
}
