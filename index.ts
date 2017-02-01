// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';

export * from './src/toasty.service';
export * from './src/toasty.component';

import { ToastyComponent } from './src/toasty.component';
import { ToastComponent } from './src/toast.component';
import { ToastyTitleTemplate, ToastyMessageTemplate, ToastyTemplateWrapper } from './src/shared';
import { ToastyService, ToastyConfig, toastyServiceFactory } from './src/toasty.service';

export let providers = [
    ToastyConfig,
    { provide: ToastyService, useFactory: toastyServiceFactory, deps: [ToastyConfig] }
];

@NgModule({
    imports: [CommonModule],
    declarations: [ToastComponent, ToastyComponent, ToastyTitleTemplate, ToastyMessageTemplate, ToastyTemplateWrapper],
    exports: [ ToastComponent, ToastyComponent, ToastyTitleTemplate, ToastyMessageTemplate],
    providers: providers
})
export class ToastyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ToastyModule,
            providers: providers
        };
    }
}