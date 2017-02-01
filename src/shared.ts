import { Directive, TemplateRef, OnInit, Input, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[toastyTemplate]'
})
export class ToastyTemplate {

    @Input('toastyTemplate') type: string;

    constructor(public templateRef: TemplateRef<any>) {
    }

    public getType(): string {
        return this.type;
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