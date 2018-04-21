import { Injectable } from '@angular/core';
import {Fanad} from '../model/fanad.model';
import {AbstractService} from './abstract-service';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FanadService extends AbstractService<Fanad, number> {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/fanad', authService);
  }

  assignToMe(ad: Fanad): Observable<Fanad> {
    return this.http.put(this.actionUrl + '/assign', ad, {headers : this.authService.getJSONAuthHeader()}).map(resp => resp as Fanad);
  }

  getMyToApprove(): Observable<Fanad[]> {
    return this.http.get(this.actionUrl + '/toapprove', {headers : this.authService.getJSONAuthHeader()}).map(resp => resp as Fanad[]);
  }

  approve(ad: Fanad): Observable<Fanad> {
    return this.http.put(this.actionUrl + '/approve', ad, {headers : this.authService.getJSONAuthHeader()}).map(resp => resp as Fanad);;
  }
  disapprove(ad: Fanad): Observable<Fanad> {
    return this.http.put(this.actionUrl + '/disapprove', ad, {headers : this.authService.getJSONAuthHeader()}).map(resp => resp as Fanad);;
  }
  uploadImage(formData): Observable<Fanad> {
    return this.http.post(this.actionUrl + '/new/', formData, {headers : this.authService.getAuthHeaderMultipart()})
      .map(resp => resp as Fanad);
  }
  updateItem(formData): Observable<Fanad> {
    return this.http.post(this.actionUrl + '/update/', formData, {headers : this.authService.getAuthHeaderMultipart()})
      .map(resp => resp as Fanad);
  }
  getMyAds(): Observable<Fanad[]> {
    return this.http.get(this.actionUrl + '/myads', {headers : this.authService.getJSONAuthHeader()})
                    .map(resp => resp as Fanad[]);
  }
  acceptBid(id): Observable<Fanad> {
    return this.http.get(this.actionUrl + '/acceptBid/' + id, {headers : this.authService.getJSONAuthHeader()})
      .map(resp => resp as Fanad);
  }
}
