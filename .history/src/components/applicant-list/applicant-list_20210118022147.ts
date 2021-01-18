
import { autoinject } from 'aurelia-framework';
import { HttpService } from '../../util/service';


@autoinject
export class ApplicantList {

  applicants: []
  isRequesting: boolean;
  constructor(private httpClient: HttpService) {

    this.isRequesting = true;
    this.httpClient.get('/applicant').then(res => {
      this.applicants = res.content.data;
      this.isRequesting = false;
    }

    ).catch(err => {
      //todo alert error
      this.isRequesting = false;
    })

  }

}
