
import { autoinject } from 'aurelia-framework';
import { HttpService } from '../../util/service';


@autoinject
export class ApplicantList{
 
  applicant:[]
  isRequesting: boolean;
  constructor(private httpClient: HttpService){
    
    this.isRequesting = true;
    this.httpClient.get('/applicant').then( res=>
      this.applicant = res.content.data

    ).catch(err=>{
      //todo alert error
      
    })

  }

}
