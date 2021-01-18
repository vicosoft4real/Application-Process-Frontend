import {element, inputType, required} from 'aurelia-form';
 
export class App {
 
  id: string;
 
  @inputType('text')
  @required()
  name: string;
  @required()
  @inputType('text')
  familyName: string;
  @element('address')
  address: string;
  @inputType('text')
  email: string ;
  @inputType('number')
  age: number;
  hired: boolean;

  
}
