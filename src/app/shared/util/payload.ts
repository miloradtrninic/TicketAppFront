export class Payload {
  constructor(
    private url:string,
    private headers:any,
    private params:any,
    private body:any) {
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
