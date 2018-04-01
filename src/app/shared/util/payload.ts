export class Payload {

  private url:string = '';
  private headers:any = null;
  private params:any = null;
  private body:any = null;

  constructor(
    url: string,
    headers: any,
    params: any,
    body: any) {
      this.url = url;
      this.headers = headers;
      this.params = params;
      this.body = body;
  }

  toPlainObject(): any {
    return {
      body: JSON.stringify(this.body),
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
