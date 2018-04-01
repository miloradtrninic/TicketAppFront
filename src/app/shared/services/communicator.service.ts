import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Constants } from '../constants/constants';
import { Payload } from '../util/payload';
import { HelperFunctions } from '../../shared/util/helper-functions';

@Injectable()
export class CommunicatorService {

  constructor(private http: HttpClient) {}

  execute(method: string, modelName: string, payload: Payload): any {
    let responseData = this.pingServer(method, payload.toPlainObject());
    let model = null;

    if(!HelperFunctions.isEmptyValue(modelName)){
      let model = Object.create(window[modelName].prototype);
      if(HelperFunctions.isEmptyValue(model))
        model.constructor.apply(model, responseData);
    }

    return model;
  }

  pingServer(method:string, payloadPlain:any): any {
    let response = null;

    switch(method) {
      case Constants.HttpMethods.GET : this.http.get(payloadPlain.url, payloadPlain.options)
                                  .subscribe(res => {
                                    response = res;
                                  }); break;

      case Constants.HttpMethods.POST : this.http.post(payloadPlain.url, payloadPlain.body, payloadPlain.options)
                                    .subscribe(res => {
                                      response = res;
                                    }); break;

      case Constants.HttpMethods.PUT : this.http.put(payloadPlain.url, payloadPlain.body, payloadPlain.options)
                                    .subscribe(res => {
                                      response = res;
                                    }); break;

      case Constants.HttpMethods.DELETE : this.http.delete(payloadPlain.url, payloadPlain.options)
                                      .subscribe(res => {
                                        response = res;
                                      });; break;

      case Constants.HttpMethods.OPTIONS : this.http.options(payloadPlain.url, payloadPlain.options)
                                      .subscribe(res => {
                                        response = res;
                                      });; break;

      case Constants.HttpMethods.HEAD : this.http.head(payloadPlain.url, payloadPlain.options)
                                      .subscribe(res => {
                                        response = res;
                                      }); break;
    }

    return response;
  }
}
