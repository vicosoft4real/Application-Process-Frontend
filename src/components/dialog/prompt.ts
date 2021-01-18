
import { autoinject } from "aurelia-dependency-injection";
import {DialogController} from 'aurelia-dialog';

@autoinject
export class Prompt{

  message:string;
  constructor(private dialog: DialogController){
     this.dialog.settings.centerHorizontalOnly = true;
  }
  activate(message) {
    this.message = message;
 }
}
