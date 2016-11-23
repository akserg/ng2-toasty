// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import { NgModule, ModuleWithProviders } from "@angular/core";

export * from './src/toasty.service';
export * from './src/toasty.component';

import { ToastyComponent } from './src/toasty.component';
import { ToastComponent } from './src/toast.component';
import { ToastyConfig, ToastyService } from './src/toasty.service';

@NgModule({
  declarations: [ToastComponent, ToastyComponent],
  exports : [ToastComponent, ToastyComponent]
})
export class ToastyModule {
  static forRoot(): ModuleWithProviders {
        return {
            ngModule: ToastyModule,
            providers: [ToastyConfig, ToastyService]
        };
    }
}