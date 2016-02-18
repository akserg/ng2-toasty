import {ToastyContainer} from './src/toasty.container';
import {ToastyComponent} from './src/toasty.component';
import {ToastyConfig} from './src/toasty.config';
import {ToastyService} from './src/toasty.service';

export * from './src/toasty.container';
export * from './src/toasty.component';
export * from './src/toasty.config';
export * from './src/toasty.service';

export default {
  providers: [ToastyConfig, ToastyService],
  directives: [ToastyContainer, ToastyComponent]
}
