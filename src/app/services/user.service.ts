import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import { User } from '../model/user.model';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {AuthenticationRequest} from '../model/authentication-request';
import { AuthService } from './auth.service';
import {UserCreation} from '../model/creation/user-creation.model';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService extends AbstractService<User, number> {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/user', authService);
  }

  register(user: UserCreation) {
    return this.http.post(this.apiUrl + '/auth/register', user);
  }

  login(loginInfo: AuthenticationRequest) {
    return this.http.post(this.apiUrl + '/auth/login', loginInfo)
      .map(ret => {
          this.authService.loggedUserToken = ret['token'];
          this.authService.storeToken();
      });
  }

  getByToken() {
    return this.http.post('/getByToken', this.authService.loggedUserToken);
  }

  getByUserName(userName: string) {
    return this.http.post('/getByUserName', userName);
  }
}
