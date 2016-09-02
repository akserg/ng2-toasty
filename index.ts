// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

'use strict';

import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

export { ToastData, ToastOptions } from './src/toasty.service';

import { ToastyComponent } from './src/toasty.component';
import { ToastComponent } from './src/toast.component';
import { ToastyConfig, ToastyService } from './src/toasty.service';

@NgModule({
  imports     : [CommonModule],
  declarations: [
    ToastComponent,
    ToastyComponent
  ],
  exports     : [
    ToastyComponent,
    ToastyConfig,
    ToastyService
  ]
})
export class ToastyModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule : ToastyModule,
      providers: [
        ToastyConfig,
        ToastyService
      ]
    };
  };
}