import {TranslatePipe} from './src/translate.pipe';
import {TranslateService} from './src/translate.service';
import {Ng2Toasty} from './src/toasty.container';
import {Ng2Toast} from './src/toasty.component';
import {ToastyConfig} from './src/toasty.config';
import {ToastyService} from './src/toasty.service';

export * from './src/translate.pipe';
export * from './src/translate.service';
export * from './src/translate.parser';
export * from './src/toasty.container';
export * from './src/toasty.component';
export * from './src/toasty.config';
export * from './src/toasty.service';

export default {
  pipes: [TranslatePipe],
  providers: [TranslateService, ToastyConfig, ToastyService],
  directives: [Ng2Toasty, Ng2Toast]
}
