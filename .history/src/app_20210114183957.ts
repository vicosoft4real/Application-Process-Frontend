import { ValidationRules } from "aurelia-validation";
import { autoinject } from "aurelia-dependency-injection";
import {I18N} from 'aurelia-i18n';
import {
  ValidationControllerFactory,
  ValidationController,
} from "aurelia-validation";
import { HttpClient } from "aurelia-http-client";



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

  controller: ValidationController;
   // i18n : I18N;
  constructor(private i18n: I18N, private httpClient:HttpClient, controllerFactory: ValidationControllerFactory, ) {
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
  submit(): void{
    this.controller
    .validate()
    .then(error=>{
      if(error.valid){
        const form = 
        {
          email : this.email, 
          address: this.address, 
          name: this.name, 
          familyName: this.familyName,
          age: this.age,
          hired: this.hired
        }
        this.httpClient.post('',form).then(res=>{
          //
        }).catch(error=>{
          console.log(error)
        })
      }else{
        this.message = this.i18n.tr('error');
      }
    })
  }
}
