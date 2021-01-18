import { ValidationRules } from "aurelia-validation";
import { autoinject } from "aurelia-dependency-injection";
import {I18N} from 'aurelia-i18n';
import {
  ValidationControllerFactory,
  ValidationController,
} from "aurelia-validation";
import { HttpClient } from "aurelia-http-client";
    

import {RouterConfiguration, Router} from 'aurelia-router';
import { DialogService } from "aurelia-dialog";
import { Prompt } from './components/dialog/prompt';
 

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
  constructor(
    private i18n: I18N, 
    private httpClient:HttpClient, 
    private router: Router,
    private  config: RouterConfiguration,
    private dialogService: DialogService,
   controllerFactory: ValidationControllerFactory ) {
    this.controller = controllerFactory.createForCurrentScope();
    this.i18n = i18n;
    
    this.config.title = 'Application Process';
    this.config.map([
      { route: 'submitted',       name: 'submitted',       moduleId: 'submitted/index', nav: true, title: 'Users' },
       
    ]);

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
  reset(){
    this.dialogService.open({viewModel: Prompt, model:"Are u sure you want reset?"})
    .then(res=>{
      if(!res.wasCancelled){
        this.controller.reset();
        this.clearForm();
      }
    });
  }
  clearForm():void{
    this.address ='';
    this.age = undefined;
    this.name ='';
    this.email ='';
    this.hired =false;
    this.familyName ='';
    
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
          this.router.navigate('/submitted')
          this.clearForm();
        }).catch(error=>{
          console.log(error)
        })
      }else{
        this.message = this.i18n.tr('error');
      }
    })
  }
}
