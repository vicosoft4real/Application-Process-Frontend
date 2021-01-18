import { PLATFORM } from 'aurelia-pal';
import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
  //config.globalResources([]);
  config.globalResources([PLATFORM.moduleName('./loading/loading-indicator')])
}
