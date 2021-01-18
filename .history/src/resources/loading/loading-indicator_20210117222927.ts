
import * as nprogress from 'nprogress';
import {bindable, noView} from 'aurelia-framework';
import 'nprogress/nprogress.css';

@noView
export class LoadingIndicator {
  @bindable loading = true;

  loadingChanged(newValue) {
    if (newValue) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }
}


