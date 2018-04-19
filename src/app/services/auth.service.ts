import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Token } from '../model/token.model';
import { HelperFunctions } from '../shared/util/helper-functions';
import {Router} from '@angular/router';
import {AuthenticationRequest} from '../model/authentication-request';
import {UserCreation} from '../model/creation/user-creation.model';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private logger = new Subject<boolean>();
  private readonly emptyToken = '{}';
  loggedUserToken: Token;
  headers = new HttpHeaders({'Content-Type': 'application/json' });
  appUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient, private router: Router) {
    this.loggedUserToken = new Token('', '', '', 0, '');
  }

  init() {
    const item = window.localStorage.getItem('currentUser');

    if (!HelperFunctions.isEmptyValue(item)) {
      if (!HelperFunctions.containsEmptyValues(item) && item === this.emptyToken) {
        const ls = JSON.parse(window.localStorage.getItem('currentUser'));
        this.loggedUserToken = new Token(ls['roles'], ls['privileges'], ls['username'], ls['id'], ls['token']);
      }
    }
  }

  storeToken() {
    window.localStorage.setItem('currentUser', JSON.stringify(this.loggedUserToken));
  }

  register(user: UserCreation) {
    return this.http.post(this.appUrl+'api/auth/register', user);
  }

  login(loginInfo: AuthenticationRequest) {
    return this.http.post(this.appUrl+'api/auth/login', loginInfo)
      .map(ret => {
        this.loggedUserToken =  new Token(ret['roles'], ret['privileges'], loginInfo.username, ret['id'], ret['token']);
        this.storeToken();
        this.logger.next(true);
      });
  }

  logout() {
    window.localStorage.clear();
    this.loggedUserToken = null;
    this.router.navigate(['/home']);
    this.logger.next(false);
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
    const storage = window.localStorage.getItem('currentUser');
    const emptyToken = '{}';

    if (this.loggedUserToken != null && this.loggedUserToken.id !== 0) {
      token = this.loggedUserToken;
    } else if (!HelperFunctions.containsEmptyValues(storage) && storage !== emptyToken) {
      const ls = JSON.parse(window.localStorage.getItem('currentUser'));
      this.loggedUserToken = new Token(ls['roles'], ls['privileges'], ls['username'], ls['id'], ls['token']);
      this.storeToken();
      token = this.loggedUserToken;
    }
    console.log('Token: ' + token);
    return token;
  }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

}
