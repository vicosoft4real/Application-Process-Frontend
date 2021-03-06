import { PLATFORM } from "aurelia-pal";
import { autoinject } from "aurelia-dependency-injection";

import { RouterConfiguration, Router } from "aurelia-router";

/**
 * App 
 *
 * @export
 * @class App
 */
@autoinject
export class App {

  router: Router;
 
/**
 *
 *
 * @param {RouterConfiguration} config
 * @param {Router} router
 * @memberof App
 */
configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Application Process';
		
      config.map([
        { route:  ['','applicant-list'],  name: 'applicant-list',
        moduleId: PLATFORM.moduleName('./components/applicant-list/applicant-list'),    nav: true, title:'Application-List' },
         { route: 'applicant-form',  name: 'applicant-form',  
            moduleId: PLATFORM.moduleName('./components/applicant-form/applicant-form'),   nav: true, title:'Applicant-Form' },
        
      ]);

      this.router = router;
  }
  
 
 
}
