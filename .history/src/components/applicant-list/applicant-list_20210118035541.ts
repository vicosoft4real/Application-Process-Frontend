import { DialogService } from 'aurelia-dialog';
import { Router } from 'aurelia-router';

import { autoinject } from 'aurelia-framework';
import { HttpService } from '../../util/service';
import { Prompt } from '../dialog/prompt';


@autoinject
export class ApplicantList {

  applicants: []
  isRequesting: boolean;
  constructor(private httpClient: HttpService, private  router: Router,  private dialogService: DialogService) {

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

  addNew(){
    this.router.navigate('applicant-form');
  }

  /**
   * delete applicant
   *
   * @param {number} id
   * @memberof ApplicantList
   */
  deleteApp(id:number){
    this.dialogService
    .open({
      viewModel: Prompt,
      model: "Are you sure you want to delete?",
      lock: true,
    })

    .whenClosed((res) => {
      if (!res.wasCancelled) {
         this.httpClient.delete(`/applicant/${id}`)
         .then(_=>{
           this.router.navigate('/applicant-list')
         })
      }
    });
  }

}
