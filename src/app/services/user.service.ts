import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import { User } from '../model/user.model';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {AuthenticationRequest} from '../model/authentication-request';


@Injectable()
export class UserService extends AbstractService<User, number> {

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

    return this.http.post('/auth/login', loginInfo, options);
  }
}
