
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';
import { autoinject } from 'aurelia-dependency-injection';

/**
 *
 *
 * @export
 * @class HttpService
 */
@autoinject
export class HttpService{
 
  get isRequesting():boolean{
    return this.httpClient.isRequesting;
  } 
  constructor(private httpClient: HttpClient){
    httpClient.configure(config => {
      config
        .withBaseUrl('https://localhost:5001/api/v1') // use env to set correct url
         // other config here
       
    });
    
  
  }

  post<T>(url:string,data:T): Promise<HttpResponseMessage>{
    return this.httpClient.post(url,data)
  }

  get(url:string): Promise<HttpResponseMessage>{
    return this.httpClient.get(url);
  }

}
