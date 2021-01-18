import { PLATFORM } from "aurelia-pal";
import { autoinject } from "aurelia-dependency-injection";

import { RouterConfiguration, Router } from "aurelia-router";

@autoinject
export class App {

  router: Router;
 

  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Aurelia';
		
      config.map([
         { route: ['','applicant-form'],  name: 'applicant-form',  
            moduleId: PLATFORM.moduleName('./components/applicant-form/applicant-form'),   nav: true, title:'Applicant-Form' },
         { route: 'about',  name: 'about',
            moduleId: PLATFORM.moduleName('./components/about/about'),    nav: true, title:'About' }
      ]);

      this.router = router;
  }
  
 
 
}
