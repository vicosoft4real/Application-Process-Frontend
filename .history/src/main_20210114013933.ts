import {Aurelia} from 'aurelia-framework';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import {I18N, Backend, TCustomAttribute} from 'aurelia-i18n';
 
 
const myConfiguration ={
  'aurelia-form': {
    // The default element used, probably best left unchanged
    defaultElement: 'input',

    // The default behavior to use for forms
    defaultBehavior: 'regular',

    // The default classes for labels
    defaultLabelClasses: '',

    // The default classes for input elements
    defaultElementClasses: '',

    // Register your (custom) elements here
    elements      : {},

    // Configured by aurelia-form-validation
    validation    : {},

    // Submit button configuration for <aurelia-form /> and <entity-form />
    submitButton: {
      enabled: true,        // Show the button
      options: ['primary'], // Options to pass to the button
      label  : 'Submit'     // Default (fallback) label of the button
    },

    // Alias these entity types to elements (used by aurelia-orm)
    aliases: {
      enum   : 'radio',
      int    : 'input',
      integer: 'input',
      number : 'input',
      float  : 'input',
      string : 'input',
      bool   : 'checkbox',
      boolean: 'checkbox',
      text   : 'textarea'
    }
  }

}


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
    .plugin(PLATFORM.moduleName('aurelia-config'), configure => {
      return configure([
         'aurelia-form'
        // Other plugins
      ], myConfiguration );
    });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
