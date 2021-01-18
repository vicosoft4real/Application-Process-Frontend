
import { HttpClient } from 'aurelia-http-client';
import { autoinject } from 'aurelia-dependency-injection';

/**
 *
 *
 * @export
 * @class HttpService
 */
@autoinject
export class HttpService{
 
  constructor(private httpClient: HttpClient){
    httpClient.configure(config => {
      config
        .withBaseUrl('https://localhost:5001/api/v1') // use env to set correct url
         // other config here
       
    });
    
  
  }

  post<T>(url:string,data:T){
    return this.httpClient.post(url,data)
  }

  get(url:string){
    return this.httpClient.get(url);
  }

}
