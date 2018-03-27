import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Constants } from '../constants/constants';
import { Payload } from '../util/payload';

@Injectable()
export class CommunicatorService {

  constructor(private http: HttpClient,
              private method:string,
              private payload:Payload) {
                this.method = method;
                this.payload = payload;
  }

  execute(modelName:string): any {
    let responseData = this.pingServer(this.payload.toPlainObject());
    let model = Object.create(window[modelName].prototype);

    model.constructor.apply(model, responseData);

    return model;
  }

  pingServer(payloadPlain:any): any {
    let response = null;

    switch(this.method) {
      case Constants.methods.GET : this.http.get(payloadPlain.url, payloadPlain.options)
                                  .subscribe(res => {
                                    response = res;
                                  }); break;

      case Constants.methods.POST : this.http.post(payloadPlain.url, payloadPlain.body, payloadPlain.options)
                                    .subscribe(res => {
                                      response = res;
                                    }); break;

      case Constants.methods.PUT : this.http.put(payloadPlain.url, payloadPlain.body, payloadPlain.options)
                                    .subscribe(res => {
                                      response = res;
                                    }); break;

      case Constants.methods.DELETE : this.http.delete(payloadPlain.url, payloadPlain.options)
                                      .subscribe(res => {
                                        response = res;
                                      });; break;

      case Constants.methods.OPTIONS : this.http.options(payloadPlain.url, payloadPlain.options)
                                      .subscribe(res => {
                                        response = res;
                                      });; break;

      case Constants.methods.HEAD : this.http.head(payloadPlain.url, payloadPlain.options)
                                      .subscribe(res => {
                                        response = res;
                                      }); break;
    }

    return response;
  }
}
