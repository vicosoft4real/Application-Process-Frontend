import { PLATFORM } from "aurelia-pal";
import { autoinject } from "aurelia-dependency-injection";

import { RouterConfiguration, Router } from "aurelia-router";

@autoinject
export class App {

  router: Router;
 

  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Aurelia';
		
      config.map([
         { route: ['','home'],  name: 'home',  
            moduleId: PLATFORM.moduleName('./components/home/home'),   nav: true, title:'Home' },
         { route: 'about',  name: 'about',
            moduleId: PLATFORM.moduleName('./components/about/about'),    nav: true, title:'About' }
      ]);

      this.router = router;
  }
  
 
 
}
