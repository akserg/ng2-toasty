import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
    constructor(private domSanitized: DomSanitizer) {}

    transform(value: any, ...args: any[]): any {
        return this.domSanitized.bypassSecurityTrustHtml(value);
    }
}