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
import {Token} from '../model/token.model';
import {UserPreview} from '../model/preview/user-preview.model';

@Injectable()
export class UserService extends AbstractService<User, number> {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/user', authService);
  }

  setLoginInfo() {
    this.authService.init();
  }

  register(user: UserCreation) {
    return this.http.post(this.apiUrl + '/auth/register', user);
  }

  login(loginInfo: AuthenticationRequest) {
    return this.http.post(this.apiUrl + '/auth/login', loginInfo)
      .map(ret => {
          this.authService.loggedUserToken =  new Token(ret['roles'], ret['privileges'], loginInfo.username, ret['id'], ret['token']);
          this.authService.storeToken();
      });
  }

  getByToken() {
    const options = {
      headers: this.authService.getAuthHeader()
    };

    return this.http.post('/profile', this.authService.loggedUserToken, options);
  }

  getByUserName(userName: string) {
    return this.http.post('/getByUserName', userName);
  }

  getOne() {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}${'/' + this.authService.loggedUserToken['id']}`;
    return this.http.get(url, options).map(resp => resp as UserPreview);
  }

  getUserFriends() {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}friends/${this.authService.loggedUserToken['id']}`;

    return this.http.get(url, options).map(resp => resp as UserPreview[]);
  }

  getNotUserFriends() {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}notFriends/${this.authService.loggedUserToken['id']}`;

    return this.http.get(url, options).map(resp => resp as UserPreview[]);
  }

  sendFriendRequest(userId: number) {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}/addFriend/${this.authService.loggedUserToken['id']}`;

    return this.http.post(url, userId, options).map(resp => resp as UserPreview);
  }

  removeFriend(userId: number) {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}removeFriend/${this.authService.loggedUserToken['id']}`;

    return this.http.post(url, userId, options).map(resp => resp as UserPreview);
  }

  acceptFriendship(userId: number) {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}acceptFriendship/${this.authService.loggedUserToken['id']}`;

    return this.http.post(url, userId, options).map(resp => resp as UserPreview);
  }

  declineFriendship(userId: number) {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}declineFriendship/${this.authService.loggedUserToken['id']}`;

    return this.http.post(url, userId, options).map(resp => resp as UserPreview);
  }
}
