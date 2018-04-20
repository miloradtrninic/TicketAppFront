import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Fanzone} from '../model/fanzone.model';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import {User} from '../model/user.model';
import {Observable} from 'rxjs/Observable';
import {Fanitem} from '../model/fanitem.model';

@Injectable()
export class FanzoneService extends AbstractService<Fanzone, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/fanzone', authService);
  }
  getAdmins(id: number): Observable<User[]> {
    return this.http.get(this.actionUrl + '/' + id + '/admins',
      {headers: this.authService.getJSONAuthHeader()}).map(resp => resp as User[]);
  }
  getMyZones(): Observable<Fanzone[]> {
    return this.http.get(this.actionUrl + '/myzones',
      {headers: this.authService.getJSONAuthHeader()}).map(resp => resp as Fanzone[]);
  }
}
