import { PLATFORM } from "aurelia-pal";
import { HttpService } from "./service";
import { ValidationRules } from "aurelia-validation";
import { autoinject } from "aurelia-dependency-injection";
import { I18N } from "aurelia-i18n";
import {
  ValidationControllerFactory,
  ValidationController,
} from "aurelia-validation";

import { RouterConfiguration, Router } from "aurelia-router";
import { DialogService } from "aurelia-dialog";
import { Prompt } from "./components/dialog/prompt";

@autoinject
export class App {
  id: string;
  name: string;
  familyName: string;
  address: string;
  email: string;
  age: number;
  hired: boolean;
  message: string;
  isRequesting: boolean;
  controller: ValidationController;
  router: Router;
  // i18n : I18N;
  constructor(
    private i18n: I18N,
    private httpClient: HttpService,

    private dialogService: DialogService,
     
     
    controllerFactory: ValidationControllerFactory
  ) {
    // this.router = router;
    this.controller = controllerFactory.createForCurrentScope();
    this.i18n = i18n;
   
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

  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = "Application Process";
    config.options.pushState = true;
    config.options.root = "/";
    config.map([
     
      {
        route: "applicant-list",
        name: "applicant-list",
        moduleId: PLATFORM.moduleName("applicant-list"),
        nav: true,
        title: "Applicant",
      },
    ]);
   
    this.router = router;
  }
  reset(): void {
    this.dialogService
      .open({
        viewModel: Prompt,
        model: "Are you sure you want to reset?",
        lock: true,
      })

      .whenClosed((res) => {
        if (!res.wasCancelled) {
          this.controller.reset();
          this.clearForm();
        }
      });
  }
  clearForm(): void {
    this.address = "";
    this.age = undefined;
    this.name = "";
    this.email = "";
    this.hired = false;
    this.familyName = "";
  }
  submit(): void {
    this.isRequesting = true;
    this.controller.validate().then((error) => {
      if (error.valid) {
        const form = {
          emailAddress: this.email,
          address: this.address,
          name: this.name,
          familyName: this.familyName,
          age: this.age,
          hired: this.hired,
        };
        this.httpClient
          .post("/applicant", form)
          .then((res) => {
            //
            this.router.navigate('/applicant-list');
            this.clearForm();
            this.isRequesting = false;
          })
          .catch((error) => {
            console.log(error);
            this.isRequesting = false;
          });
      } else {
        this.message = this.i18n.tr("error");
        this.isRequesting = false;
      }
    });
  }
}
