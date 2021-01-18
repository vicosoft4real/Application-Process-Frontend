import { ValidationRules } from "aurelia-validation";
import { autoinject } from "aurelia-dependency-injection";
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

  constructor(controllerFactory: ValidationControllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();

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
