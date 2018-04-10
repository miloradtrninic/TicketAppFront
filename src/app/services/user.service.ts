import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import { User } from '../model/user.model';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {AuthenticationRequest} from '../model/authentication-request';
import {Token} from '../model/token';


@Injectable()
export class UserService extends AbstractService<User, number> {

  private token: Token;

  constructor(http: HttpClient) {
    super(http, '/user');
  }

  register(user: User): Observable<User> {
    const options =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/auth/register', user, options);
  }

  login(loginInfo: AuthenticationRequest) {
    const options =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post('/auth/login', loginInfo, options)
      .subscribe(ret => {
        console.log(ret);       // ovde treba da se namesti token
      });
    return this.token;
  }

  getByToken() {
    return this.http.post('user/getByToken', this.token.token);
  }

  getByUserName(userName: string) {
    return this.http.post('user/getByUserName', userName);
  }

  getToken() {
    return this.token;
  }
}
