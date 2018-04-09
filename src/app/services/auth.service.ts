import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import { User } from '../model/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Token } from '../model/token';

@Injectable()
export class AuthService {
  loggedUserToken: Token;
  errorMessage: string;
  headers = new HttpHeaders({'Content-Type': 'application/json' });
  constructor(http: HttpClient) {
  }

  storeToken() {
    window.localStorage.setItem('currentUser', JSON.stringify(this.loggedUserToken));
  }
  getJSONAuthHeader(): HttpHeaders {
    return new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.loggedUserToken.token});
  }
  getFORMHeader(): HttpHeaders {
    return new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded'});
  }
  getAuthHeader(): HttpHeaders {
    return new HttpHeaders({'Authorization': 'Bearer ' + this.loggedUserToken.token});
  }
  getAuthHeaderMultipart(): HttpHeaders {
    return new HttpHeaders({'Authorization': 'Bearer ' + this.loggedUserToken.token});
  }
  getJSONHeader(): HttpHeaders {
    return this.headers;
  }

}
