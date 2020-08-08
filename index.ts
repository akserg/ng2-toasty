// Copyright (C) 2016-2017 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';

export * from './src/toasty.service';
export * from './src/toasty.component';
export * from './src/toast.component';
export * from './src/shared';

import { ToastyComponent } from './src/toasty.component';
import { ToastComponent } from './src/toast.component';
import { SafeHtmlPipe } from './src/shared';
import { ToastyService, ToastyConfig, toastyServiceFactory } from './src/toasty.service';

export let providers = [
    ToastyConfig,
    { provide: ToastyService, useFactory: toastyServiceFactory, deps: [ToastyConfig] }
];

@NgModule({
    imports: [CommonModule],
    declarations: [ToastComponent, ToastyComponent, SafeHtmlPipe],
    exports: [ ToastComponent, ToastyComponent],
    providers: providers
})
export class ToastyModule {
    static forRoot(): ModuleWithProviders<ToastyModule> {
        return {
            ngModule: ToastyModule,
            providers: providers
        };
    }
}
