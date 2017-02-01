import { Directive, TemplateRef, OnInit, Input, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[toastyTitleTemplate]'
})
export class ToastyTitleTemplate {

    constructor(public templateRef: TemplateRef<any>) {
    }
}

@Directive({
    selector: '[toastyMessageTemplate]'
})
export class ToastyMessageTemplate {

    constructor(public templateRef: TemplateRef<any>) {
    }
}

@Directive({
    selector: '[toastyTemplateWrapper]'
})
export class ToastyTemplateWrapper implements OnInit {

    @Input() context: any;

    @Input('toastyTemplateWrapper') templateRef: TemplateRef<any>;

    constructor(public viewContainer: ViewContainerRef) {
    }

    ngOnInit(): void {
        this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.context
        });
    }
}