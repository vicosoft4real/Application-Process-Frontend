import { ValidationRules } from "aurelia-validation";
import { autoinject } from "aurelia-dependency-injection";
import {I18N} from 'aurelia-i18n';
import {
  ValidationControllerFactory,
  ValidationController,
} from "aurelia-validation";

@autoinject
export class App {
  id: string;
  name: string;
  familyName: string;
  address: string;
  email: string;
  age: number;
  hired: boolean;

  controller: ValidationController;
   i18n : I18N;
  constructor(controllerFactory: ValidationControllerFactory,  i18n: I18N) {
    this.controller = controllerFactory.createForCurrentScope();
    this.i18n = i18n;
    console.log(this.i18n.getLocale())
    ValidationRules.ensure((r: App) => r.name)
      .required()
      .minLength(5)
      .ensure((r) => r.familyName)
      .required()
      .minLength(5)
      .ensure((r) => r.email)
      .email()
      .required()
      .minLength(5)
      .ensure((r) => r.age)
      .required()
      .between(20, 60)
      .ensure((m) => m.hired)
      .required()
      .ensure((m) => m.address)
      .minLength(10)
      .on(this);
  }
}
