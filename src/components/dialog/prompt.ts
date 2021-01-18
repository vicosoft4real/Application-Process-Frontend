
import { autoinject } from "aurelia-dependency-injection";
import {DialogController} from 'aurelia-dialog';

/**
 * Dialog model
 *
 * @export
 * @class Prompt
 */
@autoinject
export class Prompt{

  message:string;
  constructor(private dialog: DialogController){
     this.dialog.settings.centerHorizontalOnly = true;
  }

  /**
   *
   *
   * @param {string} message
   * @memberof Prompt
   */
  activate(message: string):void {
    this.message = message;
 }
}
