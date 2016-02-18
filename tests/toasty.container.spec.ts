import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from 'angular2/testing';

import {Observable} from 'rxjs/Observable';

import {ToastyConfig} from '../src/toasty.config';
import {ToastyService, Toast, ToastyOptions} from '../src/toasty.service';
import {ToastyContainer} from '../src/toasty.container';

export function main() {
    describe('ToastyContainer', () => {

        let container:ToastyContainer;
        
        beforeEachProviders(() => {
            return [
                ToastyService, ToastyConfig
            ];
        });
        
        beforeEach(
            inject([ToastyConfig, ToastyService], (config:ToastyConfig, service:ToastyService) => {
                container = new ToastyContainer(config, service);
            })
        );
  
        it('is defined', () => {
            expect(container).toBeDefined();
        });

    });
}