
import { autoinject } from 'aurelia-framework';
import { HttpService } from '../../util/service';


@autoinject
export class ApplicantList{
 
  applicant:[]

  constructor(private httpClient: HttpService){
    
  }

}
