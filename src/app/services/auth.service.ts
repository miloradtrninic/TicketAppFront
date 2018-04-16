import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Token } from '../model/token.model';
import { HelperFunctions } from '../shared/util/helper-functions';
import {Router} from '@angular/router';
import {AuthenticationRequest} from '../model/authentication-request';
import {UserCreation} from '../model/creation/user-creation.model';

@Injectable()
export class AuthService {
  loggedUserToken: Token;
  headers = new HttpHeaders({'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {
    this.loggedUserToken = new Token(' ', ' ', ' ', 0, ' ');
  }

  init() {
    const item = window.localStorage.getItem('currentUser');
    if (!HelperFunctions.isEmptyValue(item)) {
      if (!HelperFunctions.containsEmptyValues(item)) {
        const ls = JSON.parse(window.localStorage.getItem('currentUser'));
        this.loggedUserToken = new Token(ls['roles'], ls['privileges'], ls['username'], ls['id'], ls['token']);
      }
    }
  }

  storeToken() {
    window.localStorage.setItem('currentUser', JSON.stringify(this.loggedUserToken));
  }

  register(user: UserCreation) {
    return this.http.post('api/auth/register', user);
  }

  login(loginInfo: AuthenticationRequest) {
    return this.http.post('api/auth/login', loginInfo)
      .map(ret => {
        this.loggedUserToken =  new Token(ret['roles'], ret['privileges'], loginInfo.username, ret['id'], ret['token']);
        this.storeToken();
      });
  }

  logout() {
    window.localStorage.clear();
    this.loggedUserToken = null;
    this.router.navigate(['/home']);
  }

  getJSONAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loggedUserToken.token
    });
  }
  getFORMHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
    });
  }
  getAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.loggedUserToken.token,
    });
  }
  getAuthHeaderMultipart(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.loggedUserToken.token,
    });
  }
  getJSONHeader(): HttpHeaders {
    return this.headers;
  }
  getToken(): Token {
    let token = null;
    const ls = window.localStorage.getItem('currentUser');

    if (this.loggedUserToken != null) {
      token = this.loggedUserToken;
    } else if (HelperFunctions.isEmptyValue(window.localStorage.getItem('currentUser'))) {
      this.loggedUserToken = new Token(ls['roles'], ls['privileges'], ls['username'], ls['id'], ls['token']);
      this.storeToken();
      token = this.loggedUserToken;
    }

    return token;
  }

}
