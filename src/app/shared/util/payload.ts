import {HttpHeaders} from '@angular/common/http';

export class Payload {

  private url:string = '';
  private headers:HttpHeaders = null;
  private params:any = null;
  private body:any = null;

  constructor(
    url:string,
    headers:HttpHeaders,
    params:any,
    body:any) {
      this.url = url;
      this.headers = headers;
      this.params = params;
      this.body = body;
  }

  toPlainObject(): any {
    return {
      body: this.body,
      options: this.createOptions(),
      url: this.url,
    };
  }

  createOptions(): {} {
    return {
      headers: this.headers,
      params: this.params,
    };
  }

  getUrl():string {
    return this.url;
  }
}
