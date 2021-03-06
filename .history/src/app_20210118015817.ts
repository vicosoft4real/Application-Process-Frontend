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
         { route: 'applicant-list',  name: 'applicant-list',
            moduleId: PLATFORM.moduleName('./components/applicant-list/applicant-list'),    nav: true, title:'About' }
      ]);

      this.router = router;
  }
  
 
 
}
