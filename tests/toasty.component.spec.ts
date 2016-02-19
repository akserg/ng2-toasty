import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder,
  ComponentFixture,
  fakeAsync,
  tick
} from 'angular2/testing';

import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS}
from 'angular2/platform/testing/browser';

import {Observable} from 'rxjs/Observable';

import {Toast} from '../src/toasty.service';
import {ToastyComponent} from '../src/toasty.component';

export function main() {
    describe('ToastyComponent', () => {

        let componentFixture:ComponentFixture;

        const toast:Toast = {
            id:1,
            title:null,
            msg:null,
            showClose:false,
            clickToClose:false,
            sound:false,
            shake:'toasty-shake',
            html:null,
            type: 'toasty-type-default',
            theme:'toasty-theme-default',
            timeout: null,
            onAdd: null,
            onRemove:null,
            onClick:null
        };

        beforeEachProviders(() => {
            return [TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS];
        });


         beforeEach(injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
            return tcb.createAsync(ToastyComponent).then((cf:ComponentFixture) => {
                componentFixture = cf;
                componentFixture.componentInstance.toast = toast;
                componentFixture.detectChanges();
            });
        }));

        it('should be defined', () => {
            const element = componentFixture.nativeElement;
            expect(element.querySelector('.toast')).toBeDefined();
        });

        it('should has all classes', () => {
            const element = componentFixture.nativeElement;
            let className:string = element.querySelector('.toast').className;
            expect(className.indexOf('toast')).toBeGreaterThan(-1);
            expect(className.indexOf('toasty-type-default')).toBeGreaterThan(-1);
            expect(className.indexOf('toasty-theme-default')).toBeGreaterThan(-1);
            expect(className.indexOf('toasty-shake')).toBeGreaterThan(-1);
        });

        it('should show close button', () => {
            const element = componentFixture.nativeElement;
            expect(element.querySelector('.close-button')).toBeNull();

            componentFixture.componentInstance.toast.showClose = true;
            componentFixture.detectChanges();
            expect(element.querySelector('.close-button')).not.toBeNull();
        });

        it('should show only title', () => {
            const element = componentFixture.nativeElement;
            expect(element.querySelector('.toast-text')).toBeNull();

            componentFixture.componentInstance.toast.title = 'title';
            componentFixture.detectChanges();
            expect(element.querySelector('.toast-text')).not.toBeNull();

            expect(element.querySelector('.toast-title')).not.toBeNull();
            expect(element.querySelector('.toast-title').innerHTML).toBe('title');

            expect(element.querySelector('.toast-msg')).toBeNull();

            componentFixture.componentInstance.toast.title = null;
            componentFixture.componentInstance.toast.msg = null;
        });

        it('should show only message', () => {
            const element = componentFixture.nativeElement;
            expect(element.querySelector('.toast-text')).toBeNull();

            componentFixture.componentInstance.toast.msg = 'msg';
            componentFixture.detectChanges();
            expect(element.querySelector('.toast-text')).not.toBeNull();

            expect(element.querySelector('.toast-title')).toBeNull();

            expect(element.querySelector('.toast-msg')).not.toBeNull();
            expect(element.querySelector('.toast-msg').innerHTML).toBe('msg');

            componentFixture.componentInstance.toast.title = null;
            componentFixture.componentInstance.toast.msg = null;
        });

        it('should show title and message', () => {
            const element = componentFixture.nativeElement;
            expect(element.querySelector('.toast-text')).toBeNull();

            componentFixture.componentInstance.toast.title = 'title';
            componentFixture.componentInstance.toast.msg = 'msg';
            componentFixture.detectChanges();
            expect(element.querySelector('.toast-text')).not.toBeNull();

            expect(element.querySelector('.toast-title')).not.toBeNull();
            expect(element.querySelector('.toast-title').innerHTML).toBe('title');

            expect(element.querySelector('.toast-msg')).not.toBeNull();
            expect(element.querySelector('.toast-msg').innerHTML).toBe('msg');

            componentFixture.componentInstance.toast.title = null;
            componentFixture.componentInstance.toast.msg = null;
        });
    });
}