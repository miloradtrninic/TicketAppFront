import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import { User } from '../model/user.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpClient} from '@angular/common/http';
import {AuthenticationRequest} from '../model/authentication-request';
import { AuthService } from './auth.service';
import {UserCreation} from '../model/creation/user-creation.model';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch';
import {Token} from '../model/token.model';
import {UserPreview} from '../model/preview/user-preview.model';
import {AuditoriumPreview} from '../model/preview/auditorium-preview';

@Injectable()
export class UserService extends AbstractService<User, number> {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/user', authService);
  }

  setLoginInfo() {
    this.authService.init();
  }
  getToken(): Token {
    return this.authService.getToken();
  }
  getByRole(role: string): Observable<User[]> {
    return this.http.get(this.actionUrl + '/byrole?role=' + role).map(resp => resp as User[]);
  }
  changeRole(userID: number, roles: number[]): Observable<any> {
    return this.http.post(this.actionUrl + '/updaterole', {'userID': userID, 'roles': roles}).map(resp => resp as User);
  }
  activate(id: number): Observable<any> {
    return this.http.get(this.actionUrl + '/activate/' + id, ).map(resp => resp as User);
  }
  ban(id: number): Observable<any> {
    return this.http.get(this.actionUrl + '/ban/' + id, ).map(resp => resp as User);
  }
  getByToken() {
    const options = {
      headers: this.authService.getAuthHeader()
    };

    return this.http.post('/profile', this.authService.loggedUserToken, options);
  }

  getByUserName(userName: string) {
    return this.http.post(this.actionUrl + '/getByUserName', userName);
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
    const url = `${this.actionUrl}/friends/${this.authService.loggedUserToken['id']}`;

    return this.http.get(url, options).map(resp => resp as UserPreview[]);
  }

  getNotUserFriends() {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}/notFriends/${this.authService.loggedUserToken['id']}`;

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
    const url = `${this.actionUrl}/removeFriend/${this.authService.loggedUserToken['id']}`;

    return this.http.post(url, userId, options).map(resp => resp as UserPreview);
  }

  acceptFriendship(userId: number) {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}/acceptFriendship/${this.authService.loggedUserToken['id']}`;

    return this.http.put(url, userId, options).map(resp => resp as UserPreview);
  }

  declineFriendship(userId: number) {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}/declineFriendship/${this.authService.loggedUserToken['id']}`;

    return this.http.put(url, userId, options).map(resp => resp as UserPreview);
  }

  getFriendRequests() {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}/getFriendRequests/${this.authService.loggedUserToken['id']}`;

    return this.http.get(url, options).map(resp => resp as UserPreview[]);
  }

  changePassword(newPassword: string) {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}/changePw/${this.authService.loggedUserToken['id']}`;

    return this.http.put(url, newPassword, options).map(resp => resp as UserPreview);
  }

  getVisited() {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    const url = `${this.actionUrl}/getVisited/${this.authService.loggedUserToken['id']}`;

    return this.http.get(url, options).map(resp => resp as AuditoriumPreview[]);
  }
}
