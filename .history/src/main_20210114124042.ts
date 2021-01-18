import {Aurelia} from 'aurelia-framework';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import {I18N, Backend, TCustomAttribute} from 'aurelia-i18n';
import {ValidationMessageProvider} from 'aurelia-validation';
  
 

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()

    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      const aliases = ['t', 'i18n'];
      // add aliases for 't' attribute
      TCustomAttribute.configureAliases(aliases);

      // register backend plugin
      instance.i18next.use(Backend.with(aurelia.loader));

      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      return instance.setup({
        backend: {                                  // <-- configure backend settings
          loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
        },
        attributes: aliases,
        lng : 'de',
        fallbackLng : 'en',
        debug : false
      });
    })
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    //.plugin(PLATFORM.moduleName('aurelia-form'))
    ;

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }
  ValidationMessageProvider.prototype.getMessage = function(key) {
    const i18n = aurelia.container.get(I18N);
    const translation = i18n.tr(`errorMessages.${key}`);
    return this.parser.parse(translation);
  };

  // ValidationMessageProvider.prototype.getDisplayName = function(propertyName, displayName) {
  //   if (displayName !== null && displayName !== undefined) {
  //     return displayName;
  //   }
  //   const i18n = aurelia.container.get(I18N);
  //   return i18n.tr(propertyName);
  // };
  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
