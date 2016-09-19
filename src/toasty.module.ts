// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty


import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ToastyComponent } from './toasty.component';
import { ToastComponent } from './toast.component';
import { ToastyConfig, ToastyService } from './toasty.service';

export default {
  providers : [ToastyConfig, ToastyService],
  directives: [ToastyComponent, ToastComponent]
};

@NgModule({
  imports     : [CommonModule],
  declarations: [
    ToastComponent,
    ToastyComponent
  ],
  providers   : [
    ToastyConfig,
    ToastyService
  ],
  exports     : [
    ToastyComponent
  ]
})
export class ToastyModule {
}