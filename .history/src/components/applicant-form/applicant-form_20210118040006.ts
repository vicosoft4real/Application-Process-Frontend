

import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { Router } from 'aurelia-router';
import { ValidationController, ValidationControllerFactory, ValidationRules } from "aurelia-validation";
import { DialogService } from 'aurelia-dialog';
import { HttpService } from '../../util/service';
import { Prompt } from "../../components/dialog/prompt";

/**
 *Application form
 *
 * @export
 * @class ApplicantForm
 */
@autoinject
export class ApplicantForm {

  id: string;
  name: string;
  familyName: string;
  address: string;
  email: string;
  age: number;
  hired: boolean;
  countryOfOrigin:string;

  message: string;
  isRequesting: boolean;
  visibility: string;
  controller: ValidationController;


  /**
   * Creates an instance of ApplicantForm.
   * @param {I18N} i18n
   * @param {HttpService} httpClient
   * @param {DialogService} dialogService
   * @param {Router} router
   * @param {ValidationControllerFactory} controllerFactory
   * @memberof ApplicantForm
   */
  constructor(
    private i18n: I18N,
    private httpClient: HttpService,
    private dialogService: DialogService,
    private  router: Router,
    controllerFactory: ValidationControllerFactory
  ) {

    this.controller = controllerFactory.createForCurrentScope();
    this.i18n = i18n;

    ValidationRules.ensure((r: ApplicantForm) => r.name)
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
      .ensure(c=>c.countryOfOrigin)
      .required()
      
      .on(this);
      this.visibility = "display:none";
      this.message ='';
      this.hired = false;
  }

  /**
   *Reset form
   *
   * @memberof ApplicantForm
   */
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

  /**
   * save applicant
   *
   * @memberof ApplicantForm
   */
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
          countryOfOrigin: this.countryOfOrigin
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
            const res = JSON.parse(error.response);
            this.visibility = "display:block";
            for(const e of Object.keys(res.errors)){
              this.message += res.errors[e].join('<br/>') + "<br/>"
            }
            this.isRequesting = false;
          });
      } else {
        this.message = this.i18n.tr("error");
        this.isRequesting = false;
      }
    });
  }





/**
 *Clear form 
 *
 * @private
 * @memberof ApplicantForm
 */
private clearForm(): void {
    this.address = "";
    this.age = undefined;
    this.name = "";
    this.email = "";
    this.hired = false;
    this.familyName = "";
    this.countryOfOrigin =''
  }
}
