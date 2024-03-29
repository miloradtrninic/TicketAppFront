import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AbstractService} from './abstract-service';
import {Fanitem} from '../model/fanitem.model';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FanItemService extends AbstractService<Fanitem, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/fanitem', authService);
  }
  uploadImage(formData) {
    return this.http.post(this.actionUrl + '/new/', formData, {headers : this.authService.getAuthHeaderMultipart()})
      .map(resp => resp as Fanitem);
  }
  updateItem(formData) {
    return this.http.post(this.actionUrl + '/update/', formData, {headers : this.authService.getAuthHeaderMultipart()})
      .map(resp => resp as Fanitem);
  }
  reserve(idItem: number) {
    return this.http.get(this.actionUrl + '/reserve/' + idItem, {headers : this.authService.getJSONAuthHeader()})
      .map(resp => resp as Fanitem);
  }
  getNotReserved(idItem: number): Observable<Fanitem[]> {
    return this.http.get(this.actionUrl + '/getAll/' + idItem, {headers : this.authService.getJSONAuthHeader()})
      .map(resp => resp as Fanitem[]);
  }
  getMyItems(): Observable<Fanitem[]> {
    return this.http.get(this.actionUrl + '/myitems', {headers : this.authService.getJSONAuthHeader()})
      .map(resp => resp as Fanitem[]);
  }
}
