import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Token } from '../model/token.model';
import { HelperFunctions } from '../shared/util/helper-functions';

@Injectable()
export class AuthService {
  loggedUserToken: Token;
  errorMessage: string;
  headers = new HttpHeaders({'Content-Type': 'application/json' });

  constructor(http: HttpClient) {
  }

  init() {
    if (!HelperFunctions.isEmptyValue(window.localStorage.getItem('currentUser'))) {
      const ls = JSON.parse(window.localStorage.getItem('currentUser'));
      this.loggedUserToken = new Token(ls['roles'], ls['privileges'], ls['username'], ls['id'], ls['token']);
    }
  }

  storeToken() {
    window.localStorage.setItem('currentUser', JSON.stringify(this.loggedUserToken));
  }
  getJSONAuthHeader(): HttpHeaders {
    this.init();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loggedUserToken.token
    });
  }
  getFORMHeader(): HttpHeaders {
    this.init();
    return new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
    });
  }
  getAuthHeader(): HttpHeaders {
    this.init();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.loggedUserToken.token,
    });
  }
  getAuthHeaderMultipart(): HttpHeaders {
    this.init();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.loggedUserToken.token,
    });
  }
  getJSONHeader(): HttpHeaders {

    return this.headers;
  }

}
