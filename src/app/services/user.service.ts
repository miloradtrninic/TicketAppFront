import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import { User } from '../model/user.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpClient} from '@angular/common/http';
import {AuthenticationRequest} from '../model/authentication-request';
import { AuthService } from './auth.service';
import {UserCreation} from '../model/creation/user-creation.model';

@Injectable()
export class UserService extends AbstractService<User, number> {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/user', authService);
  }

  register(user: UserCreation) {
    return this.http.post(this.actionUrl + '/auth/register', user);
  }

  login(loginInfo: AuthenticationRequest) {
    return this.http.post(this.actionUrl + '/auth/login', loginInfo)
      .map(ret => {
          this.authService.loggedUserToken = ret['token'];
          this.authService.storeToken();
      });
  }
  getByRole(role: string): Observable<User[]> {
    return this.http.get(this.actionUrl + '/byrole?role=' + role).map(resp => resp as User[]);
  }
  changeRole(userID: number, roles: number[]): Observable<any> {
    return this.http.post(this.actionUrl + 'updaterole', {'userID': userID, 'roles': roles}).map(resp => resp as User);
  }
  activate(id: number): Observable<any> {
    return this.http.get(this.actionUrl + 'activate/' + id, ).map(resp => resp as User);
  }
  ban(id: number): Observable<any> {
    return this.http.get(this.actionUrl + 'ban/' + id, ).map(resp => resp as User);
  }
  getByToken() {
    return this.http.post(this.actionUrl + '/getByToken', this.authService.loggedUserToken);
  }

  getByUserName(userName: string) {
    return this.http.post(this.actionUrl + '/getByUserName', userName);
  }
}
