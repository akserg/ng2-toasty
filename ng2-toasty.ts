// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

'use strict';

import {Toasty} from './src/toasty.container';
import {Toast} from './src/toasty.component';
import {ToastyConfig} from './src/toasty.config';
import {ToastyService} from './src/toasty.service';

export * from './src/toasty.container';
export * from './src/toasty.component';
export * from './src/toasty.config';
export * from './src/toasty.service';

export default {
  providers: [ToastyConfig, ToastyService],
  directives: [Toasty, Toast]
}
